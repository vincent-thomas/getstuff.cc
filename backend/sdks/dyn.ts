import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const getDyn = () =>
	DynamoDBDocumentClient.from(new DynamoDBClient({ region: env.AWS_REGION }));
