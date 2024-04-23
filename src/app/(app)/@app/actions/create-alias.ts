"use server";

import { protectedProc } from "@stuff/lib/safe-action";
import { z } from "zod";
import { db } from "@backend/db";
import { generate } from "random-words";
import { quickAliases } from "@backend/db/schema";
import { stripe } from "@backend/sdks";
import { and, eq } from "drizzle-orm";

const schema = z.object({
  label: z.string(),
});

export const createAliasAction = protectedProc(
  schema,
  async ({ label }, { session }) => {
    try {
      if (session.customerStatus === "inactive") {
        const howMany = await db.query.quickAliases.findMany({
          where: and(eq(quickAliases.userId, session.userId)),
        });

        if (howMany.length > 9) {
          throw new Error("maximum aliases exceeded");
        }
      }

      const words = generate({
        min: 3,
        max: 3,
        join: "-",
      });

      const created_at = new Date();

      await db.insert(quickAliases).values({
        userId: session.userId,
        mailAlias: words,
        label,
        enabled: true,
        created_at,
      });

      if (session.customerStatus === "active") {
        await stripe.billing.meterEvents.create({
          timestamp: Math.round(created_at.getTime() / 1000),
          event_name: "api",
          payload: {
            value: "1",
            stripe_customer_id: session.customerId,
          },
        });
      }

      return { aliasId: words };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  },
);
