"use server";

import { quickAliases } from "@backend/db/schema";
import { and, eq, ilike, or } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export const listAliases = async ({
  clients: { db },
  query,
  userId,
}: {
  clients: {
    db: NodePgDatabase;
  };
  query?: string;
  userId: string;
}) => {
  return await db
    .select()
    .from(quickAliases)
    .where(
      and(
        eq(quickAliases.userId, userId),
        query !== undefined
          ? or(
              ilike(quickAliases.label, `%${query}%`),
              ilike(quickAliases.mailAlias, `%${query}%`),
            )
          : undefined,
      ),
    );
};
