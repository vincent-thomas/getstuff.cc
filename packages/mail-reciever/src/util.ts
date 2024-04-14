import { PutObjectCommand, type S3Client } from "@aws-sdk/client-s3";
import {
  type DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { getEmailContentBucket } from "@stuff/infra-constants";
import { randomUUID } from "crypto";
import { z } from "zod";
import { getDataTable } from "@stuff/infra-constants";
import { addressAliasInterface } from "backend/interfaces/addressAlias";
import { getUser } from "backend/utils/getUser";
import { threadViewInterface } from "backend/interfaces/threadView";
import type { messageViewInterface } from "backend/interfaces/messageView";
import { messageInterface } from "backend/interfaces/message";

export const uploadEmailContent = async (
  s3: S3Client,
  stage: string,
  contentId: string,
  { html, text }: { html?: string; text: string },
) => {
  await s3.send(
    new PutObjectCommand({
      Bucket: getEmailContentBucket(stage),
      Key: contentId,
      Body: JSON.stringify({ html, text }),
    }),
  );
};

export const getThreadIdFromMsgId = async (
  dyn: DynamoDBDocumentClient,
  tableName: string,
  messageId: string,
) => {
  const command = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "sk = :sk and begins_with(pk, :pk)",
    ExpressionAttributeValues: {
      ":sk": `message|${messageId}`,
      ":pk": "mail|",
    },
    IndexName: "gsi1",
  });

  const { Items } = await dyn.send(command);

  const message = messageInterface.optional().parse(Items?.[0]);

  if (message === undefined) {
    return undefined;
  }

  return z.string().parse(message.pk.split("|")[1]);
};

export async function createThread(
  dyn: DynamoDBDocumentClient,
  tableName: string,
  title: string,
) {
  const threadId = randomUUID();

  await dyn.send(
    new PutCommand({
      Item: {
        pk: `mail|${threadId}`,
        sk: `thread|${Date.now()}`,
        title,
      },
      TableName: tableName,
    }),
  );

  return threadId;
}

export const getUserFromAlias = async (
  dyn: DynamoDBDocumentClient,
  stage: string,
  alias: string,
) => {
  const command = new QueryCommand({
    TableName: getDataTable(stage),

    KeyConditionExpression: "sk = :sk and begins_with(pk, :pk)",
    ExpressionAttributeValues: {
      ":sk": `address-alias|enabled|${alias}`,
      ":pk": "mail",
    },
    IndexName: "gsi1",
  });

  const result = await dyn.send(command).then((v) => v.Items);

  if (result === undefined || result?.length !== 1) {
    return undefined;
  }

  const existingAlias = addressAliasInterface.optional().parse(result[0]);
  if (existingAlias == undefined) {
    return undefined;
  }
  return await getUser(
    dyn,
    stage,
    z.string().parse(existingAlias.pk.split("|")[1]),
  );
};

export const contactInterface = z.object({
  name: z.string(),
  address: z.string(),
});

type Contact = z.infer<typeof contactInterface>;

export const uploadMessage = async (
  s3: S3Client,
  dyn: DynamoDBDocumentClient,
  stage: string,
  messageId: string,
  threadId: string,
  {
    subject,
    to,
    from,
    cc,
    content: { html, text },
  }: {
    subject: string;
    to: Contact[];
    cc: Contact[];
    content: { html?: string; text: string };
    from: Contact;
  },
  replyToMessageId?: string,
) => {
  await uploadEmailContent(s3, stage, messageId, {
    html,
    text,
  });

  await dyn.send(
    new PutCommand({
      TableName: getDataTable(stage),
      Item: {
        pk: `mail|${threadId}`,
        sk: `message|${messageId}`,
        created_at: Date.now(),
        subject,
        from,
        repliedToId: replyToMessageId ?? null,
        to: to,
        cc,
      } satisfies z.infer<typeof messageInterface>,
    }),
  );
};

export const createThreadView = (
  dyn: DynamoDBDocumentClient,
  stage: string,
  folderId: string,
  threadId: string,
  username: string,
) => {
  return dyn.send(
    new PutCommand({
      TableName: getDataTable(stage),
      Item: {
        pk: `mail|${threadId}`,
        sk: `thread-view|${username}|${folderId}`,
        last_active: Date.now(),
        read: false,
      } satisfies z.infer<typeof threadViewInterface>,
    }),
  );
};

export const getThreadView = async (
  dyn: DynamoDBDocumentClient,
  stage: string,
  threadId: string,
  username: string,
) => {
  const result = await dyn.send(
    new QueryCommand({
      TableName: getDataTable(stage),
      KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": `mail|${threadId}`,
        ":sk": `thread-view|${username}`,
      },
    }),
  );

  return threadViewInterface.optional().parse(result.Items?.[0]);
};

export const createMessageView = async (
  dyn: DynamoDBDocumentClient,
  stage: string,
  {
    messageId,
    encryptedMessageEncryptionKey,
  }: { messageId: string; encryptedMessageEncryptionKey: string },
) => {
  await dyn.send(
    new PutCommand({
      TableName: getDataTable(stage),
      Item: {
        pk: `mail|${messageId}`,
        sk: `message-view|${Date.now()}`,
        encryptedMessageEncryptionKey,
      } satisfies z.infer<typeof messageViewInterface>,
    }),
  );
};
