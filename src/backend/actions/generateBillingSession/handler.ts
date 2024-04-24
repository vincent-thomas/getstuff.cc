"use server";

import { stripe } from "@backend/sdks";

export const generateBillingSession = async ({
  customerId,
}: { customerId: string }) => {
  const billingPortalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: env.APP_URL,
  });
  return { url: billingPortalSession.url };
};
