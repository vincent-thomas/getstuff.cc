"use server";

import { protectedProc } from "@stuff/lib/safe-action";
import { db } from "@backend/db";
import { quickAliases } from "@backend/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({ aliasId: z.string(), enabled: z.boolean() });

export const changeAliasStatusAction = protectedProc(
  schema,
  async ({ aliasId, enabled }, { session }) => {
    await db
      .update(quickAliases)
      .set({ enabled })
      .where(
        and(
          eq(quickAliases.userId, session.userId),
          eq(quickAliases.mailAlias, aliasId),
        ),
      );

    return { enabled };
  },
);
