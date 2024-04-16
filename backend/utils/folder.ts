import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { getDataTable } from "@stuff/infra-constants";
import { BUILTIN_FOLDERS } from "src/constants/builtinFolders";
import { folderInterface } from "../interfaces/folder";
import { getDyn } from "../sdks/dyn";

export const getFolder = async (username: string, folderId: string) => {
  const command = new GetCommand({
    TableName: getDataTable(env.STAGE),
    Key: {
      pk: `mail|${username}`,
      sk: `folder|${folderId}`,
    },
  });

  const result = await getDyn(env.AWS_REGION).send(command);
  return folderInterface.optional().parse(result.Item);
};

export const builtInFolder = (folder: string) =>
  BUILTIN_FOLDERS.includes(folder);
