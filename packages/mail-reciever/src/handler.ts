import { z } from "zod";
import type { messageValidator } from "./validators";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { env } from "@/env";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { mailHandlerGuard } from "./mailguard";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import { parseEmail } from "./emailParser";
import { encryptSymmetric, genSymmetricKey } from "@/lib/sym-crypto";
import {
  createThread,
  getThreadFromMsgId,
  getUserFromAlias,
  uploadEmailContent
} from "./util";
import { getDataTable } from "@stuff/infra-constants";
import { getUser } from "packages/api/utils/getUser";
import { encryptAsymmetric } from "@/lib/asym-crypto";

export const mailHandler = async (
  tableName: string,
  usersTableName: string,
  {
    mail: {
      commonHeaders: { messageId }
    },

    receipt: {
      action: { bucketName, objectKey },
      spfVerdict,
      dkimVerdict,
      dmarcVerdict
    }
  }: z.infer<typeof messageValidator>
) => {
  const dynClient = new DynamoDBClient({ region: env.REGION });
  const dyn = DynamoDBDocumentClient.from(dynClient);
  const ses = new SESClient({ region: env.REGION });

  if (
    !(await mailHandlerGuard(
      dyn,
      tableName,
      messageId,
      spfVerdict.status,
      dkimVerdict.status,
      dmarcVerdict.status
    ))
  ) {
    console.log("MAIL FAILED GUARD");
    return;
  }

  const s3 = new S3Client({ region: env.REGION });

  const emailFromBucketUnparsed = await s3
    .send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey
      })
    )
    .then(data => data.Body?.transformToString());

  const parsed = await parseEmail(z.string().parse(emailFromBucketUnparsed));
  if (parsed?.recievedByAddresses === undefined) {
    return;
  }

  for (const address of parsed.recievedByAddresses
    .filter(({ address }) => address.endsWith("@getstuff.cc"))
    .map(v => v.address.split("@")[0])) {
    let result = await getUser(dyn, z.string().parse(address));

    if (result === undefined) {
      result = await getUserFromAlias(dyn, z.string().parse(address));
    }
    if (result === undefined) {
      if (parsed.returnPath !== undefined) {
        await ses.send(
          new SendEmailCommand({
            Destination: {
              ToAddresses: [parsed.returnPath]
            },
            Message: {
              Body: {
                Text: {
                  Charset: "UTF-8",
                  Data: "This address is not registered with Stuff."
                }
              },
              Subject: {
                Charset: "UTF-8",
                Data: "Error: Unregistered Email Address"
              }
            },
            Source: "'Stuff Mail Delivery' <maildelivery@getstuff.cc>"
          })
        );
      }
      return;
    }
  }
  const encryptionKey = genSymmetricKey();

  const htmlContent =
    parsed.body.html === false
      ? undefined
      : encryptSymmetric(parsed.body.html, Buffer.from(encryptionKey));

  const textContent =
    parsed.body.text === undefined
      ? undefined
      : encryptSymmetric(parsed.body.text, Buffer.from(encryptionKey));

  if (textContent === undefined) {
    return;
  }
  await uploadEmailContent(s3, messageId, {
    html: htmlContent,
    text: textContent
  });

  let threadId: string | undefined;

  if (parsed.messageIdReplyingTo) {
    threadId = await getThreadFromMsgId(
      dyn,
      tableName,
      parsed.messageIdReplyingTo
    );
  }

  if (!threadId) {
    threadId = await createThread(
      dyn,
      tableName,
      parsed.subject ?? "Untitled Thread"
    );
  }

  await dyn.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        pk: `mail|${threadId}`,
        sk: `message|${messageId}`,
        created_at: Date.now(),
        subject: parsed.subject,
        from: parsed.sentFromAddress,
        repliedToId:
          parsed.messageIdReplyingTo === undefined
            ? null
            : z.string().parse(parsed.messageIdReplyingTo),
        to: parsed.recievedByAddresses,
        cc: parsed.cc
      }
    })
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
          shouldBeDownloadable: att.shouldBeDownloaded
        }
      })
    );

    await s3.send(
      new PutObjectCommand({
        Bucket: getDataTable(env.STAGE),
        Key: att.contentId,
        Body: att.content
      })
    );
  }

  for (let username of parsed.recievedByAddresses
    .filter(address => address.address?.endsWith(`@${env.DOMAIN}`))
    .map(v => v.address.split("@")[0])) {
    if (username === undefined) {
      return;
    }
    let user = await getUser(dyn, username);

    if (user === undefined) {
      user = await getUserFromAlias(dyn, username);
    }
    if (user === undefined) {
      return;
    }

    username = user.user_id;

    const encryptedUserKey = encryptAsymmetric(
      Buffer.from(encryptionKey),
      user.publicKey
    );

    await dyn.send(
      new PutCommand({
        TableName: getDataTable(env.STAGE),
        Item: {
          pk: `mail|${threadId}`,
          sk: `thread-view|inbox|${username}`,
          last_active: Date.now(),
          read: false,
          encryptedKey: encryptedUserKey
        }
      })
    );
  }
};
