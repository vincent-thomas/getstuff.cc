import { env } from "@/env"
import { GetCommand } from "@aws-sdk/lib-dynamodb"
import { getDataTable } from "@stuff/infra-constants"
import { getDyn } from "../client/dyn"
import { folderInterface } from "../interfaces/folder"

export const getFolder = async (username: string,folderId: string) => {
  const command = new GetCommand({
    TableName: getDataTable(env.STAGE),
    Key: {
      pk: `mail|${username}`,
      sk: `folder|${folderId}`
    }
  })

  const result = await getDyn().send(command);
  return folderInterface.optional().parse(result.Item)
}

export const builtInFolder = (folder: string) => ["inbox", "sent", "drafts", "archive"].includes(folder);
