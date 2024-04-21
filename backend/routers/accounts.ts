import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { protectedProc, pubProc, router } from "backend/trpc";
import { cookies } from "next/headers";

import { createJwt } from "../utils/jwt";
import { createUser, getUser } from "backend/utils/user";
import { createId } from "backend/utils/createId";
import { SendEmailCommand } from "@aws-sdk/client-ses";

export const accountsRouter = router({
  createAccount: pubProc
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input: { name, email } }) => {
      try {
        await createUser({ email, name });
      } catch (e) {
        logger.error("unknown error", e);
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exists",
        });
      }
    }),
  initLoginLink: pubProc
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx: { redis, ses }, input: { email } }) => {
      const id = createId();
      await redis.set(`auth:magic-link:${id}`, email, "EX", 300);

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
    }),
  requestSession: pubProc
    .input(
      z.object({
        linkId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { redis }, input: { linkId } }) => {
      const email = await redis.get(`auth:magic-link:${linkId}`);

      if (email === null) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Code has expired" });
      }
      const user = await getUser(email);

      if (user === undefined) {
        logger.error(`user not defined: email=${email}`);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      const jwt = await createJwt(user.userId, user.customerId, user.status);
      cookies().set(`stuff-token-${user.userId}`, jwt, {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      });
      cookies().set("stuff-active", user.userId, {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      });
    }),
  logout: protectedProc.mutation(() => {
    cookies().delete("token");
  }),
});
