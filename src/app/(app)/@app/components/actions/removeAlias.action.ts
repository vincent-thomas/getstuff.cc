"use server";

import { action } from "@stuff/lib/safe-action";
import { db } from "backend/db";
import { quickAliases } from "backend/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getUser } from "../../layout";

export const removeAliasAction = action(
  z.object({ aliasId: z.string() }),
  async ({ aliasId }) => {
    const user = await getUser();
    await db
      .delete(quickAliases)
      .where(
        and(
          eq(quickAliases.userId, user.userId),
          eq(quickAliases.mailAlias, aliasId),
        ),
      );
  },
);
