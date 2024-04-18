import { TRPCError } from "@trpc/server";
import { protectedProc, router } from "backend/trpc";
import { moveThread } from "backend/utils/moveThread";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { message, threadTable, threadViewTable } from "backend/db/schema";

export const threadsRouter = router({
  getThreads: protectedProc
    .input(
      z.object({ folderId: z.string(), searchQuery: z.string().optional() }),
    )
    .query(async ({ ctx, input: { folderId } }) => {
      const threads = await ctx.db
        .select()
        .from(threadTable)
        .innerJoin(
          threadViewTable,
          and(
            eq(threadViewTable.folderId, folderId),
            eq(threadViewTable.username, ctx.session.username),
          ),
        );

      return threads;
    }),

  getThread: protectedProc
    .input(z.object({ folderId: z.string(), threadId: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(threadViewTable)
        .where(
          and(
            eq(threadViewTable.username, ctx.session.username),
            eq(threadViewTable.threadId, input.threadId),
          ),
        );

      if (result.length !== 1) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const thread = await ctx.db
        .select()
        .from(threadTable)
        .where(and(eq(threadTable.threadId, result[0]!.threadId)));

      // TODO: message view

      const messages = await ctx.db
        .select()
        .from(message)
        .where(eq(message.threadId, thread[0]!.threadId));
      // .innerJoin(messageView);

      return {
        thread: {
          title: thread[0]!.title,
          lastActive: result[0]!.lastActive,
          read: result[0]!.read,
          createdAt: thread[0]?.createdAt,
        },
        messages,
      };
      // const result = await ctx.db.select().from(threadTable).where(and(eq(threadTable.threadId)))
      // const result = await ctx.db
      //   .select()
      //   .from(threadTable)
      //   .where(and(eq(threadTable.threadId, input.threadId)))
      //   .leftJoin(
      //     threadViewTable,
      //     eq(threadViewTable.folderId, input.folderId),
      //   );

      // console.info(result);
      // const threadViewsCommand = new QueryCommand({
      //   TableName: getDataTable(env.STAGE),
      //   KeyConditionExpression: "sk = :sk and begins_with(pk, :pk)",
      //   ExpressionAttributeValues: {
      //     ":sk": `thread-view|${ctx.session.username}|${folderId}`,
      //     ":pk": `mail|${threadId}`,
      //   },
      //   IndexName: "gsi1",
      // });
      // const { Items } = await ctx.dyn.send(threadViewsCommand);
      // const threadView = z.array(threadViewInterface).parse(Items)?.[0];
      // if (threadView === undefined) {
      //   return null;
      // }
      // const messageCommand = new QueryCommand({
      //   TableName: getDataTable(env.STAGE),
      //   KeyConditionExpression: "begins_with(sk,:sk) and pk = :pk",
      //   ExpressionAttributeValues: {
      //     ":sk": "message|",
      //     ":pk": `mail|${threadId}`,
      //   },
      // });
      // const { Items: messages } = await ctx.dyn.send(messageCommand);
      // const threadCommand = new QueryCommand({
      //   TableName: getDataTable(env.STAGE),
      //   KeyConditionExpression: "begins_with(sk,:sk) and pk = :pk",
      //   ExpressionAttributeValues: {
      //     ":sk": "thread|",
      //     ":pk": `mail|${threadView.pk.split("|")[1]}`,
      //   },
      // });
      // const { Items: threadItems } = await ctx.dyn.send(threadCommand);
      // const thread = threadInterface.parse(threadItems?.[0]);
      // const niceMessages = [];
      // const formattedMessages = z.array(messageInterface).parse(messages);
      // for (const message of formattedMessages) {
      //   const messageId = message.sk.split("|")[1];
      //   const command = new GetObjectCommand({
      //     Bucket: getEmailContentBucket(env.STAGE),
      //     Key: messageId,
      //   });
      //   const contentUrl = await getSignedUrl(ctx.s3, command);
      //   const getMessageViewCommand = new QueryCommand({
      //     TableName: getDataTable(env.STAGE),
      //     KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
      //     ExpressionAttributeValues: {
      //       ":sk": "message-view|",
      //       ":pk": `mail|${messageId}`,
      //     },
      //   });
      //   const messageViewsRAW = await ctx.dyn
      //     .send(getMessageViewCommand)
      //     .then(v => v.Items);
      //   const messageView = messageViewInterface.parse(messageViewsRAW?.[0]);
      //   niceMessages.push({
      //     messageId: z.string().parse(messageId),
      //     to: message.to,
      //     from: message.from,
      //     subject: message.subject,
      //     contentUrl,
      //     messageEncryptionKey: messageView.encryptedMessageEncryptionKey,
      //   });
      //   await ctx.redis.set(`content-url:${messageId}`, contentUrl, "EX", 900);
      // }
      // return {
      //   messages: niceMessages,
      //   thread: {
      //     lastActive: threadView.last_active,
      //     read: threadView.read,
      //     title: thread.title,
      //   },
      // };
    }),
  moveThreads: protectedProc
    .input(
      z.object({
        folderId: z.string(),
        threadIds: z.array(z.string()),
        newFolderId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { folderId, threadIds, newFolderId } }) => {
      if (folderId === "sent") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: "Cannot move threads from sent folder",
        });
      }
      const results = [];
      for (const threadId of threadIds) {
        const result = await moveThread(
          ctx.session.username,
          threadId,
          folderId,
          newFolderId,
        );
        results.push(result.success);
      }
      return results;
    }),

  setRead: protectedProc
    .input(
      z.object({
        folderId: z.string(),
        threadIds: z.array(z.string()),
        value: z.boolean(),
      }),
    )
    .mutation(async () => {
      // for (const threadId of input.threadIds) {
      //   const command = new UpdateCommand({
      //     TableName: getDataTable(env.STAGE),
      //     Key: {
      //       pk: `mail|${threadId}`,
      //       sk: `thread-view|${ctx.session.username}|${input.folderId}`,
      //     },
      //     ExpressionAttributeNames: {
      //       "#read": "read",
      //     },
      //     ExpressionAttributeValues: {
      //       ":value": input.value,
      //     },
      //     UpdateExpression: "set #read = :value",
      //   });
      //   await ctx.dyn.send(command);
      // }
    }),
});
