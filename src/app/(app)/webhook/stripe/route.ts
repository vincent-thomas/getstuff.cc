import { db } from "@backend/db";
import { userTable } from "@backend/db/schema";
import { subscriptionTable } from "@backend/db/schema/subscriptions";
import { stripe } from "@backend/sdks";
import { createId } from "@backend/utils/createId";
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

  switch (event.type) {
    case "customer.subscription.created": {
      const customerId = z.string().safeParse(event.data.object.customer);

      if (!customerId.success) {
        logger.error(
          "customerId is not of type string",
          event.data.object.customer,
        );
        break;
      }

      await db.transaction(async tx => {
        const userFromCustomerId = await tx
          .select()
          .from(userTable)
          .where(eq(userTable.customerId, customerId.data))
          .then(v => v?.[0]);

        if (userFromCustomerId === undefined) {
          logger.error("invalid customer_id", event.data.object);
          return;
        }

        const subscriptionId = createId();
        const stripeSubscriptionId = event.data.object.id;

        await tx.insert(subscriptionTable).values({
          subscriptionId,
          stripeSubscriptionId,
          currentPeriodStart: new Date(
            event.data.object.current_period_start * 1000,
          ),
          currentPeriodEnd: new Date(
            event.data.object.current_period_end * 1000,
          ),
          customerId: userFromCustomerId.customerId,
          startDate: new Date(event.data.object.start_date * 1000),
          status: event.data.object.status,
        });
      });
      break;
    }

    case "payment_method.detached": {
      break;
    }

    case "payment_method.attached": {
      break;
    }

    case "customer.subscription.updated": {
      const customerId = z.string().safeParse(event.data.object.customer);

      if (!customerId.success) {
        logger.error(
          "customerId is not of type string",
          event.data.object.customer,
        );
        break;
      }

      await db
        .update(subscriptionTable)
        .set({
          status: event.data.object.status,
          currentPeriodEnd: new Date(
            event.data.object.current_period_end * 1000,
          ),
          currentPeriodStart: new Date(
            event.data.object.current_period_start * 1000,
          ),
          canceled_at:
            event.data.object.canceled_at !== null
              ? new Date(event.data.object.canceled_at * 1000)
              : null,
        })
        .where(
          eq(subscriptionTable.stripeSubscriptionId, event.data.object.id),
        );

      break;
    }

    default: {
      logger.warn("unknown event", event.type, event.data.object);
      break;
    }
  }

  return new Response(undefined, { status: 200 });
};
