import { GetCommand, type DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { userInterface } from "../interfaces/user";
import { getCustomerTable, getUserTable } from "@stuff/infra-constants";
import { customerInterface } from "../interfaces/customer";


export async function getUser(dyn: DynamoDBDocumentClient, stage: string, username: string) {
  const command = new GetCommand({
    TableName: getUserTable(stage),
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
  stage:string,
  customer_id: string
) => {
  const command = new GetCommand({
    TableName: getCustomerTable(stage),
    Key: {
      customer_id
    }
  });

  return customerInterface
    .optional()
    .parse(await dyn.send(command).then(v => v.Item));
};
