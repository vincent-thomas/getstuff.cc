"use server";

import { protectedProc } from "@stuff/lib/safe-action";
import { db } from "@backend/db";
import { quickAliases } from "@backend/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { stripe } from "@backend/sdks";

export const removeAliasAction = protectedProc(
  z.object({ aliasId: z.string() }),
  async ({ aliasId }, { session }) => {
    await db
      .delete(quickAliases)
      .where(
        and(
          eq(quickAliases.userId, session.userId),
          eq(quickAliases.mailAlias, aliasId),
        ),
      );
    if (session.customerStatus !== "inactive") {
      await stripe.billing.meterEvents.create({
        timestamp: Math.round(Date.now() / 1000),
        event_name: "api",
        payload: {
          value: "-1",
          stripe_customer_id: session.customerId,
        },
      });
    }
  },
);