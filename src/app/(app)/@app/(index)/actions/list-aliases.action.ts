"use server";

import { action } from "@stuff/lib/safe-action";
import { z } from "zod";
import { getUser } from "../../layout";
import { db } from "backend/db";
import { quickAliases } from "backend/db/schema";
import { and, eq, ilike, or } from "drizzle-orm";

export const listAliases = action(z.string(), async query => {
  const user = await getUser();

  return await db.query.quickAliases.findMany({
    where: and(
      eq(quickAliases.userId, user.userId),
      query !== undefined
        ? or(
            ilike(quickAliases.label, `%${query}%`),
            ilike(quickAliases.mailAlias, `%${query}%`),
          )
        : undefined,
    ),
  });
});
