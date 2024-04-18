import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getDataTable } from "@stuff/infra-constants";
import { quickAliases } from "backend/db/schema";
import { protectedProc, router } from "backend/trpc";
import { and, eq } from "drizzle-orm";
import { generate } from "random-words";
import { z } from "zod";

export const mailRelayRouter = router({
  enabled: protectedProc.query(() => {
    // TODO!
    return false;
    // const command = new GetCommand({
    //   TableName: getDataTable(env.STAGE),
    //   Key: {
    //     pk: `extension|${ctx.session.username}`,
    //     sk: "mail-relay",
    //   },
    // });

    // const response = await ctx.dyn.send(command).then(v => v.Item);

    // return response !== undefined;
  }),
  enable: protectedProc.mutation(async ({ ctx }) => {
    const command = new PutCommand({
      TableName: getDataTable(env.STAGE),
      Item: {
        pk: `extension|${ctx.session.username}`,
        sk: "mail-relay",
      },
    });

    await ctx.dyn.send(command);
  }),
  listAliases: protectedProc.query(async ({ ctx }) => {
    const aliases = await ctx.db.query.quickAliases.findMany({
      where: and(eq(quickAliases.username, ctx.session.username)),
    });

    return aliases;
  }),

  removeAlias: protectedProc
    .input(
      z.object({
        alias: z.string(),
        enabled: z.boolean(),
      }),
    )
    .mutation(async ({ ctx }) => {
      await ctx.db
        .delete(quickAliases)
        .where(
          and(
            eq(quickAliases.username, ctx.session.username),
            eq(quickAliases.enabled, true),
          ),
        );
    }),
  createAlias: protectedProc
    .input(
      z.object({
        label: z.string(),
      }),
    )
    .mutation(async ({ ctx }) => {
      const words = generate({
        min: 3,
        max: 3,
        join: "-",
      });

      await ctx.db.insert(quickAliases).values({
        username: ctx.session.username,
        mailAlias: words,
        enabled: true,
        created_at: new Date(),
      });
    }),
});
