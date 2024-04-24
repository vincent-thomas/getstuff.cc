import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { parseEmail } from "./emailParser";
import { getEnv } from "./env";
import { quickAliases, userTable } from "@backend/db/schema";
import { eq } from "drizzle-orm";
import {
  BounceType,
  SendBounceCommand,
  SendEmailCommand,
} from "@aws-sdk/client-ses";
import { z } from "zod";
import { getSes } from "@backend/sdks/ses";
import { db } from "./db";
import { logger } from "packages/logger";

const s3 = new S3Client();

export const mailHandler = async (
  bucketName: string,
  objectKey: string,
  messageId: string,
) => {
  const env = getEnv();
  const ses = getSes(env.AWS_REGION);
  const getRawMailCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  const email = await s3
    .send(getRawMailCommand)
    .then(v => v.Body?.transformToString());

  if (email === undefined) {
    return "";
  }

  const parsedMail = await parseEmail(email);

  if (parsedMail === undefined) {
    return "";
  }

  const aliasEmail = parsedMail?.recievedByAddresses?.[0]?.address;

  if (aliasEmail === undefined) {
    // @ts-expect-error its redacted
    parsedMail.body = "[REDACTED]";
    // @ts-expect-error its redacted
    parsedMail.attachments = "[REDACTED]";
    // @ts-expect-error its redacted
    parsedMail.sentFromAddress = "[REDACTED]";
    // @ts-expect-error its redacted
    parsedMail.cc = "[REDACTED]";

    logger.error("aliasId is undefined", parsedMail);
    return "";
  }

  const aliasId = aliasEmail.replace(`@${env.EMAIL_DOMAIN}`, "");

  const alias = await db
    .select()
    .from(quickAliases)
    .where(eq(quickAliases.mailAlias, aliasId))
    .execute()
    .then(value => value?.[0]);

  if (alias === undefined || !alias.enabled) {
    const command = new SendBounceCommand({
      OriginalMessageId: messageId,
      BounceSender: `serviceadmin@${env.EMAIL_DOMAIN}`,
      Explanation: "This email doesn't exist",

      BouncedRecipientInfoList: [
        {
          Recipient: z.string().parse(aliasEmail),
          BounceType: BounceType.DoesNotExist,
        },
      ],
    });

    await ses.send(command);
    return "";
  }

  const user = (await db
    .select()
    .from(userTable)
    .where(eq(userTable.userId, alias.userId))
    .execute()
    .then(v => v?.[0]))!;

  const deleteEmailCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  logger.debug(`Send to person ${aliasId}`);

  const sendCommand = new SendEmailCommand({
    Destination: {
      ToAddresses: [user.email],
    },
    Message: {
      Body: {
        Html: { Data: parsedMail.body.html || undefined },
        Text: { Data: parsedMail.body.text },
      },
      Subject: { Data: parsedMail.subject },
    },
    Source: `${parsedMail.sentFromAddress?.name
      .replaceAll(" ", "_")
      .toLowerCase()}.${parsedMail.sentFromAddress?.address
      ?.replace("@", "_at_")
      .replaceAll(".", "_")}@getstuff.cc`,
  });
  await ses.send(sendCommand);
  await s3.send(deleteEmailCommand);
};
