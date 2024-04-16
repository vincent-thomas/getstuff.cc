import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getDataTable } from "@stuff/infra-constants";
import { folderInterface } from "backend/interfaces/folder";
import { protectedProc, router } from "backend/trpc";
import { createId } from "backend/utils/createId";
import { builtInFolder, getFolder } from "backend/utils/folder";
import { z } from "zod";

export const foldersRouter = router({
  folderExists: protectedProc
    .input(z.object({ folderId: z.string() }))
    .query(async ({ input: { folderId }, ctx }) => {
      if (builtInFolder(folderId)) {
        return true;
      }

      const userFolderExists = await getFolder(ctx.session.username, folderId);

      return !!userFolderExists;
    }),

  getFolder: protectedProc
    .input(z.object({ folderId: z.string() }))
    .query(async ({ input: { folderId }, ctx }) => {
      if (builtInFolder(folderId)) {
        return null;
      }

      const userFolderExists = await getFolder(ctx.session.username, folderId);

      return userFolderExists;
    }),

  createFolder: protectedProc
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const folderId = createId();
      const command = new PutCommand({
        TableName: getDataTable(env.STAGE),
        Item: folderInterface.parse({
          gsi2: `folder|${ctx.session.username}|${input.name}`,
          pk: `mail|${ctx.session.username}`,
          sk: `folder|${folderId}`,
        } satisfies z.infer<typeof folderInterface>),
      });

      await ctx.dyn.send(command);
    }),
  listFolders: protectedProc.query(async ({ ctx }) => {
    const command = new QueryCommand({
      TableName: getDataTable(env.STAGE),
      KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": `mail|${ctx.session.username}`,
        ":sk": "folder|",
      },
    });

    const { Items } = await ctx.dyn.send(command);

    const folders = z.array(folderInterface).parse(Items);

    folders?.sort((a, b) => a.gsi2.localeCompare(b.gsi2));

    return folders;
  }),
});
