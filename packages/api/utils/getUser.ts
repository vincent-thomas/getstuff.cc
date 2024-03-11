import { GetCommand, type DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { userInterface } from "../interfaces/user";
import { getCustomerTable, getUserTable } from "@stuff/infra-constants";
import { env } from "@/env";
import { customerInterface } from "../interfaces/customer";

export async function getUser(dyn: DynamoDBDocumentClient, username: string) {
  const command = new GetCommand({
    TableName: getUserTable(env.STAGE),
    Key: {
      user_id: username
    }
  });

  return userInterface
    .optional()
    .parse(await dyn.send(command).then(v => v.Item));
}

export const getCustomer = async (
  dyn: DynamoDBDocumentClient,
  customer_id: string
) => {
  const command = new GetCommand({
    TableName: getCustomerTable(env.STAGE),
    Key: {
      customer_id
    }
  });

  return customerInterface
    .optional()
    .parse(await dyn.send(command).then(v => v.Item));
};
