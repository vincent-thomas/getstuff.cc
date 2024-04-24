"use server";

import { stripe } from "@backend/sdks";
import { protectedProc } from "@stuff/lib/safe-action";
import { z } from "zod";

export const getStuffPlusLink = protectedProc(
  z.undefined().optional(),
  async (_, { session: { customerId } }) => {
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: env.STRIPE_PER_ALIAS_PRICE_ID,
        },
      ],
      success_url: `${env.APP_URL}`,
      currency: "SEK",
    });

    return {
      checkoutUrl: z.string().parse(checkoutSession.url),
    };
  },
);
