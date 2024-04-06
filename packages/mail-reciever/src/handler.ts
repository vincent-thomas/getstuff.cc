import { z } from "zod";
import type { messageValidator } from "./validators";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { mailHandlerGuard } from "./mailguard";
import {
	S3Client,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import { parseEmail } from "./emailParser";
import {
	contactInterface,
	createMessageView,
	createThread,
	getThreadIdFromMsgId,
	getThreadView,
	getUserFromAlias,
	uploadMessage,
} from "./util";
import { getDataTable } from "@stuff/infra-constants";
import { getEnv } from "./env";
import { getUser } from "backend/utils/getUser";
import {
	encryptAsymmetric,
	encryptSymmetric,
	genSymmetricKey,
} from "@stuff/lib/crypto";
import { moveThread } from "backend/utils/moveThread";

export const mailHandler = async ({
	mail: {
		commonHeaders: { messageId },
	},

	receipt: {
		action: { bucketName, objectKey },
		spfVerdict,
		dkimVerdict,
		dmarcVerdict,
	},
}: z.infer<typeof messageValidator>) => {
	const env = getEnv();
	const dynClient = new DynamoDBClient({ region: env.AWS_REGION });
	const dyn = DynamoDBDocumentClient.from(dynClient);
	const ses = new SESClient({ region: env.AWS_REGION });
	const tableName = getDataTable(env.STAGE);

	if (
		!(await mailHandlerGuard(
			dyn,
			tableName,
			messageId,
			spfVerdict.status,
			dkimVerdict.status,
			dmarcVerdict.status,
		))
	) {
		console.log("MAIL FAILED GUARD");
		return;
	}

	const s3 = new S3Client({ region: env.AWS_REGION });

	const emailFromBucketUnparsed = await s3
		.send(
			new GetObjectCommand({
				Bucket: bucketName,
				Key: objectKey,
			}),
		)
		.then((data) => data.Body?.transformToString());

	const parsed = await parseEmail(z.string().parse(emailFromBucketUnparsed));

	if (parsed?.recievedByAddresses === undefined) {
		return;
	}

	for (const address of parsed.recievedByAddresses
		.filter(({ address }) => address.endsWith(`@${env.EMAIL_DOMAIN}`))
		.map((v) => v.address.split("@")[0])) {
		let result = await getUser(dyn, env.STAGE, z.string().parse(address));

		if (result === undefined) {
			result = await getUserFromAlias(
				dyn,
				env.STAGE,
				z.string().parse(address),
			);
		}
		if (result === undefined) {
			if (parsed.returnPath !== undefined) {
				await ses.send(
					new SendEmailCommand({
						Destination: {
							ToAddresses: [parsed.returnPath],
						},
						Message: {
							Body: {
								Text: {
									Charset: "UTF-8",
									Data: "This address is not registered with Stuff.",
								},
							},
							Subject: {
								Charset: "UTF-8",
								Data: "Error: Unregistered Email Address",
							},
						},
						Source: "'Stuff Mail Delivery' <maildelivery@getstuff.cc>",
					}),
				);
			}

			// TODO: Alla ska inte 'inte' processeras
			return;
		}
	}

	let threadId: string | undefined;

	if (parsed.messageIdReplyingTo) {
		threadId = await getThreadIdFromMsgId(
			dyn,
			tableName,
			parsed.messageIdReplyingTo,
		);
	}

	console.debug("EXISTING THREAD ID?", threadId);

	console.debug("PARSED", parsed);

	const encryptionKey = genSymmetricKey();

	if (parsed.body.text === undefined) {
		return;
	}

	const textContent = encryptSymmetric(
		parsed.body.text,
		Buffer.from(encryptionKey),
	);
	const htmlContent =
		parsed.body.html === false
			? undefined
			: encryptSymmetric(parsed.body.html, Buffer.from(encryptionKey));

	if (threadId === undefined) {
		console.debug("CREATING THREAD", parsed.subject ?? "Untitled Thread");
		threadId = await createThread(
			dyn,
			tableName,
			parsed.subject ?? "Untitled Thread",
		);
	}

	// Singular per conversation
	const uploadEmailContent = async () => {
		await uploadMessage(
			s3,
			dyn,
			env.STAGE,
			messageId,
			z.string().parse(threadId),
			{
				subject: parsed.subject ?? "",
				to: z.array(contactInterface).parse(parsed.recievedByAddresses),
				cc: z.array(contactInterface).parse(parsed.cc),
				content: {
					html: htmlContent,
					text: textContent,
				},
				from: contactInterface.parse(parsed.sentFromAddress),
			},
			parsed.messageIdReplyingTo,
		);

		for (const att of parsed.attachments) {
			await dyn.send(
				new PutCommand({
					TableName: tableName,
					Item: {
						pk: `mail|${messageId}`,
						sk: `attachment|${att.contentId}`,
						created_at: Date.now(),
						filename: att.filename,
						mimeType: att.mimeType,
						size: att.size,
						shouldBeDownloadable: att.shouldBeDownloaded,
					},
				}),
			);

			await s3.send(
				new PutObjectCommand({
					Bucket: getDataTable(env.STAGE),
					Key: att.contentId,
					Body: att.content,
				}),
			);
		}
	};

	console.debug("UPLOADING EMAIL CONTENT");
	await uploadEmailContent();

	// Adds proper metadata for users to be accessable
	for (const username of parsed.recievedByAddresses
		.filter((address) => address.address?.endsWith(`@${env.EMAIL_DOMAIN}`))
		.map((v) => v.address.split("@")[0])) {
		if (username === undefined) {
			return;
		}

		try {
			let user = await getUser(dyn, env.STAGE, username);

			if (user === undefined) {
				user = await getUserFromAlias(dyn, env.STAGE, username);
			}
			console.debug("USERNAME to send", user?.user_id);

			if (user === undefined) {
				continue;
			}

			const encryptedUserKey = encryptAsymmetric(
				Buffer.from(encryptionKey),
				user.publicKey,
			);

			const threadView = await getThreadView(
				dyn,
				env.STAGE,
				threadId,
				username,
			);

			console.debug("THREAD VIEW", threadView);

			if (threadView?.sk.split("|")?.[2] === "sent") {
				await moveThread(dyn, env.STAGE, username, threadId, {
					folderId: "sent",
					newFolderId: "inbox",
				});
			}

			await createMessageView(dyn, env.STAGE, {
				messageId,
				encryptedMessageEncryptionKey: encryptedUserKey,
			});
		} catch (e) {
			console.error("UNKNOWN ERROR", e);
		}
	}
};
