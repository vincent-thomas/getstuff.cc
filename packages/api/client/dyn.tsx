import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { env } from "@/env";

export const getDyn = () =>
  DynamoDBDocumentClient.from(new DynamoDBClient({ region: env.REGION }));
