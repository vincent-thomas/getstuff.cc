import { env } from "@/env";
import type Stripe from "stripe";
import { z } from "zod";
import { getStripe } from "../sdks/stripe";
import { protectedProc, router } from "../trpc";
import { getStuffPlusPriceId } from "../utils/prices";

export const customerRouter = router({
  checkout: protectedProc
    .output(z.object({ sessionUrl: z.string() }))
    .mutation(async ({ ctx }) => {
      const stripe = await getStripe();

      const cachedSession = z
        .string()
        .nullable()
        .parse(
          await ctx.redis.get(`checkout-session-url:${ctx.session.customerId}`),
        );

      if (cachedSession) {
        return { sessionUrl: cachedSession };
      }
      const now = Math.round(Date.now() / 1000);
      const expires_at = 60 * 30;

      const session = await createSession(
        stripe,
        ctx.session.customerId,
        now + expires_at,
      );
      await ctx.redis.set(
        `checkout-session-url:${ctx.session.customerId}`,
        z.string().parse(session.url),
        "EX",
        now + expires_at,
      );

      return { sessionUrl: z.string().parse(session.url) };
    }),
});

const createSession = async (
  stripe: Stripe,
  customerId: string,
  expires_at: number,
) => {
  return stripe.checkout.sessions.create({
    mode: "subscription",
    currency: "SEK",
    customer: customerId,
    line_items: [
      {
        quantity: 1,
        price: await getStuffPlusPriceId(),
      },
    ],
    expires_at,
    success_url: `${env.APP_URL}/mail/inbox`,
    cancel_url: `${env.APP_URL}/pricing`,
  });
};
