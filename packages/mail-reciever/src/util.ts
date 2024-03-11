import { env } from "@/env";
import { PutObjectCommand, type S3Client } from "@aws-sdk/client-s3";
import {
  type DynamoDBDocumentClient,
  PutCommand,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { getEmailContentBucket } from "@stuff/infra-constants";
import { randomUUID } from "crypto";
import { z } from "zod";

export const uploadEmailContent = async (
  s3: S3Client,
  contentId: string,
  { html, text }: { html?: string; text: string }
) => {
  await s3.send(
    new PutObjectCommand({
      Bucket: getEmailContentBucket(env.STAGE),
      Key: contentId,
      Body: JSON.stringify({ html, text })
    })
  );
};

export const getThreadFromMsgId = async (
  dyn: DynamoDBDocumentClient,
  tableName: string,
  messageId: string
) => {
  const command = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "sk = :sk and begins_with(pk, :pk)",
    ExpressionAttributeValues: {
      ":sk": `message|${messageId}`,
      ":pk": "mail|"
    },
    IndexName: "gsi1"
  });

  const { Items } = await dyn.send(command);

  if (Items === undefined || Items?.length !== 1) {
    return undefined;
  }

  return z.string().parse(Items?.[0]?.pk).split("|")[1];
};

export async function createThread(
  dyn: DynamoDBDocumentClient,
  tableName: string,
  title: string
) {
  const threadId = randomUUID();

  await dyn.send(
    new PutCommand({
      Item: {
        pk: `mail|${threadId}`,
        sk: `thread|${Date.now()}`,
        title
      },
      TableName: tableName
    })
  );

  return threadId;
}

import { getDataTable } from "@stuff/infra-constants";
import { addressAliasInterface } from "packages/api/interfaces/addressAlias";
import { getUser } from "packages/api/utils/getUser";

export const getUserFromAlias = async (
  dyn: DynamoDBDocumentClient,
  alias: string
) => {
  const command = new QueryCommand({
    TableName: getDataTable(env.STAGE),

    KeyConditionExpression: "sk = :sk and begins_with(pk, :pk)",
    ExpressionAttributeValues: {
      ":sk": `address-alias|enabled|${alias}`,
      ":pk": "mail"
    },
    IndexName: "gsi1"
  });

  const result = await dyn.send(command).then(v => v.Items);

  if (result === undefined || result?.length !== 1) {
    return undefined;
  }

  const existingAlias = addressAliasInterface.optional().parse(result[0]);
  if (existingAlias == undefined) {
    return undefined;
  }
  return await getUser(dyn, z.string().parse(existingAlias.pk.split("|")[1]));
};
