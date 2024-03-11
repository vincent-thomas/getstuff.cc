import { env } from "@/env";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { getDataTable } from "@stuff/infra-constants";
import { threadInterface } from "packages/api/interfaces/thread";
import { threadViewInterface } from "packages/api/interfaces/threadView";
import { protectedProc, router } from "packages/api/trpc";
import { z } from "zod";

export const threadsRouter = router({
  getThreads: protectedProc
    .input(z.object({ folderId: z.string() }))
    .query(async ({ ctx, input: { folderId } }) => {
      const threadViewsCommand = new QueryCommand({
        TableName: getDataTable(env.STAGE),
        KeyConditionExpression: "sk = :sk and begins_with(pk, :pk)",
        ExpressionAttributeValues: {
          ":sk": `thread-view|${folderId}|${ctx.session.username}`,
          ":pk": "mail|"
        },
        IndexName: "gsi1"
      });

      const { Items } = await ctx.dyn.send(threadViewsCommand);

      const threadViews = z.array(threadViewInterface).parse(Items);
      console.log(threadViews);
      const threads = [];
      for (const threadView of threadViews) {
        const threadCommand = new QueryCommand({
          TableName: getDataTable(env.STAGE),
          KeyConditionExpression: "begins_with(sk,:sk) and pk = :pk",
          ExpressionAttributeValues: {
            ":sk": `thread|`,
            ":pk": "mail|" + threadView.pk.split("|")[1]
          }
        });

        const { Items } = await ctx.dyn.send(threadCommand);

        if (Items?.length !== 1) {
          continue;
        }

        const thread = threadInterface.parse(Items?.[0]);
        console.log(thread, threadView);

        threads.push({
          threadId: z.string().parse(thread.pk.split("|")[1]),
          title: thread.title,
          lastActive: threadView.last_active,
          encryptionKey: threadView.encryptedKey,
          read: threadView.read
        });
      }

      return threads;
    }),
  getThread: protectedProc
    .input(z.object({ folderId: z.string(), threadId: z.string() }))
    .query(async ({ ctx, input: { folderId, threadId } }) => {
      const threadViewsCommand = new QueryCommand({
        TableName: getDataTable(env.STAGE),
        KeyConditionExpression: "sk = :sk and begins_with(pk, :pk)",
        ExpressionAttributeValues: {
          ":sk": `thread-view|${folderId}|${ctx.session.username}`,
          ":pk": `mail|${threadId}`
        },
        IndexName: "gsi1"
      });

      const { Items } = await ctx.dyn.send(threadViewsCommand);

      return z.array(threadViewInterface).parse(Items);
    }),
  moveThreads: protectedProc
    .input(
      z.object({
        folderId: z.string(),
        threadIds: z.array(z.string()),
        newFolderId: z.string()
      })
    )
    .mutation(async ({ ctx, input: { folderId, threadIds, newFolderId } }) => {
      const results = [];
      for (const threadId of threadIds) {
        if (threadId === newFolderId) {
          results.push(false);
          continue;
        }
        const threadViewsCommand = new GetCommand({
          TableName: getDataTable(env.STAGE),
          Key: {
            sk: `thread-view|${folderId}|${ctx.session.username}`,
            pk: `mail|${threadId}`
          }
        });

        const { Item } = await ctx.dyn.send(threadViewsCommand);

        if (Item === undefined) {
          results.push(false);
          continue;
        }

        const threadView = threadViewInterface.parse(Item);

        const putCommand = new PutCommand({
          TableName: getDataTable(env.STAGE),
          Item: {
            ...threadView,
            sk: `thread-view|${newFolderId}|${ctx.session.username}`
          }
        });

        await ctx.dyn.send(putCommand);

        const deleteCommand = new DeleteCommand({
          TableName: getDataTable(env.STAGE),
          Key: {
            sk: `thread-view|${folderId}|${ctx.session.username}`,
            pk: `mail|${threadId}`
          }
        });

        await ctx.dyn.send(deleteCommand);
        results.push(true);
      }
      return results;
    })
});
