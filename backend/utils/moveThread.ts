import { PutCommand, type DynamoDBDocumentClient, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { getDataTable } from "@stuff/infra-constants";
import { threadViewInterface } from "backend/interfaces/threadView";

export const moveThread = async (dyn: DynamoDBDocumentClient, stage:string, username: string, threadId:string, {folderId, newFolderId}: {folderId:string, newFolderId:string}) => {
    const threadViewsCommand = new GetCommand({
    TableName: getDataTable(stage),
    Key: {
      sk: `thread-view|${username}|${folderId}`,
      pk: `mail|${threadId}`
    }
  });

  const { Item } = await dyn.send(threadViewsCommand);

  if (Item === undefined) {
    return {success: false}
  }

  const threadView = threadViewInterface.parse(Item);

  const putCommand = new PutCommand({
    TableName: getDataTable(stage),
    Item: {
      ...threadView,
      sk: `thread-view|${username}|${newFolderId}`
    }
  });

  await dyn.send(putCommand);

  const deleteCommand = new DeleteCommand({
    TableName: getDataTable(stage),
    Key: {
      sk: `thread-view|${username}|${folderId}`,
      pk: `mail|${threadId}`
    }
  });

  await dyn.send(deleteCommand);
  return {success: true}
}