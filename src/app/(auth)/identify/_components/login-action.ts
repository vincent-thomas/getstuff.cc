"use server";

import { SendEmailCommand } from "@aws-sdk/client-ses";
import { action } from "@stuff/lib/safe-action";
import { redis, getSes } from "backend/sdks";
import { createId } from "backend/utils/createId";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export const sendMagicLinkAction = action(schema, async ({ email }) => {
  const id = createId();
  await redis.set(`auth:magic-link:${id}`, email, "EX", 300);
  const ses = getSes(env.AWS_REGION);

  await ses.send(
    new SendEmailCommand({
      Destination: {
        ToAddresses: [email],
      },
      Source: `noreply@${env.DOMAIN}`,
      Message: {
        Body: { Text: { Data: `heres link: ${env.APP_URL}/login/${id}` } },
        Subject: { Data: "Login" },
      },
    }),
  );
});
