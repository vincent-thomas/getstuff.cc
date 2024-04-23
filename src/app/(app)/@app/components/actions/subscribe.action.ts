"use server";

import { stripe } from "@backend/sdks";
import { protectedProc } from "@stuff/lib/safe-action";
import { z } from "zod";

export const getStuffPlusLink = protectedProc(
  z.undefined().optional(),
  async (_, { session: { customerId } }) => {
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "setup",
      success_url: `${env.APP_URL}`,
      currency: "SEK",
    });

    return {
      checkoutUrl: z.string().parse(checkoutSession.url),
    };
  },
);
