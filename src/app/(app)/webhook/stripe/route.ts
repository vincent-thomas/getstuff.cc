import { db } from "@backend/db";
import { users } from "@backend/db/schema";
import { stripe } from "@backend/sdks";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const body = await req.text();

  const signature = z.string().parse(headers().get("stripe-signature"));

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    env.STRIPE_WEBHOOK_SECRET,
  );

  if (event.type === "setup_intent.succeeded") {
    if (
      event.data.object.status === "succeeded" &&
      event.data.object.customer
    ) {
      await db
        .update(users)
        .set({ status: "active" })
        .where(
          eq(
            users.customerId,
            typeof event.data.object.customer === "string"
              ? event.data.object.customer
              : event.data.object.customer.id,
          ),
        );
    }
  }

  return new Response(undefined, { status: 200 });
};
