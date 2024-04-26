"use server";

import { quickAliases } from "@backend/db/schema";
import { and, eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export const changeAliasStatusActionHandler = async ({
  data,
  clients,
}: {
  clients: { db: NodePgDatabase };
  data: { userId: string; aliasId: string; enabled: boolean };
}) => {
  await clients.db
    .update(quickAliases)
    .set({ enabled: data.enabled })
    .where(
      and(
        eq(quickAliases.userId, data.userId),
        eq(quickAliases.mailAlias, data.aliasId),
      ),
    );

  return { enabled: data.enabled };
};
