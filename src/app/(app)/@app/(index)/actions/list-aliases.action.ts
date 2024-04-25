"use server";

import { protectedProc } from "@stuff/lib/safe-action";
import { z } from "zod";
import { db } from "@backend/db";
import { quickAliases } from "@backend/db/schema";
import { and, eq, ilike, or } from "drizzle-orm";

export const listAliasesAction = protectedProc(
  z.string().optional(),
  async (query, { session }) => {
    return await db
      .select()
      .from(quickAliases)
      .where(
        and(
          eq(quickAliases.userId, session.userId),
          query !== undefined
            ? or(
                ilike(quickAliases.label, `%${query}%`),
                ilike(quickAliases.mailAlias, `%${query}%`),
              )
            : undefined,
        ),
      );
  },
);
