import { quickAliases } from "backend/db/schema";
import { protectedProc, router } from "backend/trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const addressAliasesRouter = router({
  getAliases: protectedProc
    .input(z.object({ folderId: z.string() }))
    .query(async ({ ctx }) => {
      const aliases = await ctx.db.query.quickAliases.findMany({
        where: eq(quickAliases.username, ctx.session.username),
      });

      return aliases;
    }),
});
