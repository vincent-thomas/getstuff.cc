"use server";

import { protectedProc } from "@stuff/lib/safe-action";
import { z } from "zod";
import { db } from "@backend/db";
import { quickAliases } from "@backend/db/schema";
import { and, eq, ilike, or } from "drizzle-orm";

export const listAliases = protectedProc(
  z.string(),
  async (query, { session }) => {
    return await db.query.quickAliases.findMany({
      where: and(
        eq(quickAliases.userId, session.userId),
        query !== undefined
          ? or(
              ilike(quickAliases.label, `%${query}%`),
              ilike(quickAliases.mailAlias, `%${query}%`),
            )
          : undefined,
      ),
    });
  },
);
