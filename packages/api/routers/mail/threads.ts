import { env } from "@/env";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { getDataTable, getEmailContentBucket } from "@stuff/infra-constants";
import { threadInterface } from "packages/api/interfaces/thread";
import { threadViewInterface } from "packages/api/interfaces/threadView";
import { protectedProc, router } from "packages/api/trpc";
import { z } from "zod";
import { messageInterface } from "../../interfaces/message";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

        threads.push({
          threadId: z.string().parse(thread.pk.split("|")[1]),
          title: thread.title,
          lastActive: threadView.last_active,
          encryptionKey: threadView.encryptedKey,
          read: threadView.read
        });
      }

      threads.sort((a, b) => b.lastActive - a.lastActive);

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

      const threadView = z.array(threadViewInterface).parse(Items)?.[0];

      if (threadView === undefined) {
        return null;
      }

      const messageCommand = new QueryCommand({
        TableName: getDataTable(env.STAGE),
        KeyConditionExpression: "begins_with(sk,:sk) and pk = :pk",
        ExpressionAttributeValues: {
          ":sk": `message|`,
          ":pk": `mail|${threadId}`
        }
      });

      const { Items: messages } = await ctx.dyn.send(messageCommand);

      const threadCommand = new QueryCommand({
        TableName: getDataTable(env.STAGE),
        KeyConditionExpression: "begins_with(sk,:sk) and pk = :pk",
        ExpressionAttributeValues: {
          ":sk": `thread|`,
          ":pk": "mail|" + threadView.pk.split("|")[1]
        }
      });

      const { Items: threadItems } = await ctx.dyn.send(threadCommand);

      const thread = threadInterface.parse(threadItems?.[0]);

      const niceMessages = [];

      const formattedMessages = z.array(messageInterface).parse(messages);

      for (const message of formattedMessages) {
        const messageId = message.sk.split("|")[1];
        const command = new GetObjectCommand({
          Bucket: getEmailContentBucket(ctx.env.STAGE),
          Key: messageId
        });

        const contentUrl = await getSignedUrl(ctx.s3, command);
        niceMessages.push({
          messageId: z.string().parse(messageId),
          to: message.to,
          from: message.from,
          subject: message.subject,
          contentUrl
        });

        await ctx.redis.set("content-url:" + messageId, contentUrl, {
          ex: 900
        });
      }
      return {
        messages: niceMessages,
        thread: {
          lastActive: threadView.last_active,
          encryptionKey: threadView.encryptedKey,
          read: threadView.read,
          title: thread.title
        }
      };
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
    }),

  setRead: protectedProc
    .input(
      z.object({
        folderId: z.string(),
        threadIds: z.array(z.string()),
        value: z.boolean()
      })
    )
    .mutation(async ({ ctx, input }) => {
      for (const threadId of input.threadIds) {
        const command = new UpdateCommand({
          TableName: getDataTable(ctx.env.STAGE),
          Key: {
            pk: `mail|${threadId}`,
            sk: `thread-view|${input.folderId}|${ctx.session.username}`
          },
          ExpressionAttributeNames: {
            "#read": "read"
          },
          ExpressionAttributeValues: {
            ":value": input.value
          },
          UpdateExpression: "set #read = :value"
        });

        await ctx.dyn.send(command);
      }
    })
});
