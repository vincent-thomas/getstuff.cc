import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import type { Verdict } from "./validators";

export const mailHandlerGuard = async (
  dyn: DynamoDBDocumentClient,
  tableName: string,
  messageId: string,
  spfVerdict: Verdict,
  dkimVerdict: Verdict,
  dmarcVerdict: Verdict,
) => {
  if (dmarcVerdict !== "PASS") {
    console.info("ACCEPTING ANYWAY ERROR: dmarcVerdict", { dmarcVerdict });
  }

  if (spfVerdict !== "PASS" || dkimVerdict !== "PASS") {
    console.info("ERROR: security passes", {
      spfVerdict,
      dkimVerdict,
      dmarcVerdict,
    });
    return false;
  }

  const messageExists = await messageIdExists(dyn, tableName, messageId);

  return !messageExists;
};

async function messageIdExists(
  dyn: DynamoDBDocumentClient,
  tableName: string,
  messageId: string,
) {
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

  return (Items ?? []).length > 0;
}
