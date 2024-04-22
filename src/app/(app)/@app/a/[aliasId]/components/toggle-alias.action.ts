"use server";

import { action } from "@stuff/lib/safe-action";
import { db } from "backend/db";
import { quickAliases } from "backend/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getUser } from "../../../layout";

const schema = z.object({ aliasId: z.string(), enabled: z.boolean() });

export const changeAliasStatusAction = action(
  schema,
  async ({ aliasId, enabled }) => {
    const user = (await getUser())!;
    await db
      .update(quickAliases)
      .set({ enabled })
      .where(
        and(
          eq(quickAliases.userId, user.userId),
          eq(quickAliases.mailAlias, aliasId),
        ),
      );

    return { enabled };
  },
);
