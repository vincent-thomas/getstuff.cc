import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { Stripe } from "stripe";
import { z } from "zod";

const getStripeKey = (ssm: SSMClient) =>
  ssm
    .send(
      new GetParameterCommand({
        Name: `/stuff/api/${env.STAGE}/stripe-key`,
        WithDecryption: true,
      }),
    )
    .then(v => z.string().parse(v.Parameter?.Value));

export const getStripe = async () => {
  const ssm = new SSMClient({ region: env.AWS_REGION });
  const stripeKey = await getStripeKey(ssm);

  return new Stripe(stripeKey);
};
