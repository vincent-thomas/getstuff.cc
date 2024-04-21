import { quickAliases } from "backend/db/schema";
import { protectedProc, router } from "backend/trpc";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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
  enable: protectedProc.mutation(() => {
    // const command = new PutCommand({
    //   TableName: getDataTable(env.STAGE),
    //   Item: {
    //     pk: `extension|${ctx.session.username}`,
    //     sk: "mail-relay",
    //   },
    // });
    // await ctx.dyn.send(command);
  }),
  listAliases: protectedProc.query(async ({ ctx }) => {
    const aliases = await ctx.db.query.quickAliases.findMany({
      where: and(eq(quickAliases.userId, ctx.session.userId)),
    });

    return aliases;
  }),

  removeAlias: protectedProc
    .input(
      z.object({
        alias: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(quickAliases)
        .where(
          and(
            eq(quickAliases.userId, ctx.session.userId),
            eq(quickAliases.mailAlias, input.alias),
          ),
        );
    }),
  createAlias: protectedProc
    .input(
      z.object({
        label: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { label } }) => {
      const words = generate({
        min: 3,
        max: 3,
        join: "-",
      });

      await ctx.db.insert(quickAliases).values({
        userId: ctx.session.userId,
        mailAlias: words,
        label,
        enabled: true,
        created_at: new Date(),
      });
    }),
});
