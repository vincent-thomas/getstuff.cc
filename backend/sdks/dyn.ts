import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const getDyn = (region: string) =>
  DynamoDBDocumentClient.from(new DynamoDBClient({ region }));
