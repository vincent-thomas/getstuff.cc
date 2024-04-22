"use server";

import { action } from "@stuff/lib/safe-action";
import { z } from "zod";
import { getUser } from "../layout";
import { db } from "backend/db";
import { generate } from "random-words";
import { quickAliases } from "backend/db/schema";
import { stripe } from "backend/sdks";
import { and, eq } from "drizzle-orm";

const schema = z.object({
  label: z.string(),
});

export const createAliasAction = action(schema, async ({ label }) => {
  const user = await getUser();

  if (user.status === "inactive") {
    const howMany = await db.query.quickAliases.findMany({
      where: and(eq(quickAliases.userId, user.userId)),
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
    userId: user.userId,
    mailAlias: words,
    label,
    enabled: true,
    created_at,
  });

  if (user.status === "active") {
    await stripe.billing.meterEvents.create({
      timestamp: created_at.getTime() / 1000,
      event_name: "api",
      payload: {
        value: "1",
        stripe_customer_id: user.customerId,
      },
    });
  }

  return { aliasId: words };
});
