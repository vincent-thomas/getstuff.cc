import { quickAliases } from "backend/db/schema";
import { protectedProc, router } from "backend/trpc";
import { and, eq, ilike, or } from "drizzle-orm";
import { generate } from "random-words";
import { z } from "zod";

export const mailRelayRouter = router({
  changeAliasStatus: protectedProc
    .input(z.object({ aliasId: z.string(), enabled: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(quickAliases)
        .set({ enabled: input.enabled })
        .where(
          and(
            eq(quickAliases.userId, ctx.session.userId),
            eq(quickAliases.mailAlias, input.aliasId),
          ),
        );
    }),
  listAliases: protectedProc
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const aliases = await ctx.db.query.quickAliases.findMany({
        where: and(
          eq(quickAliases.userId, ctx.session.userId),
          input.query !== undefined
            ? or(
                ilike(quickAliases.label, `%${input.query}%`),
                ilike(quickAliases.mailAlias, `%${input.query}%`),
              )
            : undefined,
        ),
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
      return words;
    }),
});
