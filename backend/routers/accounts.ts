import { z } from "zod";

import { randomBytes } from "crypto";
import { TRPCError } from "@trpc/server";
import { customerTable, users } from "backend/db/schema";
import { protectedProc, pubProc, router } from "backend/trpc";
import { cookies } from "next/headers";
import {
  deriveSession,
  generateEphemeral,
} from "secure-remote-password/server";
import { getStripe } from "../sdks/stripe";
import { getCustomer, getUser } from "../utils/getUser";
import { createJwt } from "../utils/jwt";

export const accountsRouter = router({
  createAccount: pubProc
    .input(
      z.object({
        username: z.string(),
        salt: z.string(),
        verifier: z.string(),
        publicKey: z.string(),
        name: z.string(),
        encryptedUserData: z.string(),
        encryptedDataKey: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx: { db },
        input: {
          username,
          name,
          salt,
          verifier,
          publicKey,
          encryptedDataKey,
          encryptedUserData,
        },
      }) => {
        const stripe = await getStripe();
        const existingUser = await getUser(username);
        if (existingUser) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Username already exists",
          });
        }
        const response = await stripe.customers.create({
          email: `${username}@getstuff.cc`,
          name: username,
        });

        await db.transaction(async tr => {
          await tr.insert(customerTable).values({
            customerId: response.id,
            status: "inactive",
          });
          await tr.insert(users).values({
            username: username,
            customerId: response.id,
            salt,
            publicKey,
            name,
            verifier,
            encryptedDataKey,
            encryptedUserData,
          });
        });
      },
    ),
  initAccountSession: pubProc
    .input(z.object({ username: z.string() }))
    .output(z.object({ salt: z.string(), serverEphemeralPublic: z.string() }))
    .mutation(async ({ ctx: { redis }, input: { username } }) => {
      const user = await getUser(username);

      if (user === undefined) {
        logger.debug("user doesnt exist, sending random response");
        // Random response to prevent knowing that username doesn't exist
        return {
          salt: randomBytes(64).toString("hex"),
          serverEphemeralPublic: randomBytes(512).toString("hex"),
        };
      }

      const serverEphemeral = generateEphemeral(user.verifier);
      await redis.set(username, serverEphemeral.secret, "EX", 60 * 5);

      return {
        salt: user.salt,
        serverEphemeralPublic: serverEphemeral.public,
      };
    }),
  requestSession: pubProc
    .input(
      z.object({
        username: z.string(),
        clientEpheremalPublic: z.string(),
        clientSessionProof: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx: { redis },
        input: {
          username,
          clientEpheremalPublic: clientPublicEpheremal,
          clientSessionProof,
        },
      }) => {
        const user = await getUser(username);

        try {
          if (user === undefined) {
            logger.debug(`user doesnt exist, user_id=${username}`);
            throw {};
          }
          const customer = (await getCustomer(user.customerId))!;
          const serverSecretEpheremal = z
            .string()
            .parse(await redis.get(username));

          const serverSession = deriveSession(
            serverSecretEpheremal,
            clientPublicEpheremal,
            user.salt,
            username,
            user.verifier,
            clientSessionProof,
          );

          const jwt = await createJwt(
            username,
            user.customerId,
            customer.status,
          );
          cookies().set(`stuff-token-${username}`, jwt, {
            sameSite: "strict",
            secure: true,
            httpOnly: true,
          });
          cookies().set("stuff-active", username, {
            sameSite: "strict",
            secure: true,
            httpOnly: true,
          });

          return {
            serverProof: serverSession.proof,
          };
        } catch {
          throw { code: "NOT_FOUND", message: "Invalid credentials" };
        }
      },
    ),
  logout: protectedProc.mutation(() => {
    const username = cookies().get("stuff-active")?.value;
    cookies().delete("stuff-active");

    if (username) {
      const jti = cookies().get(`stuff-token-${username}`)?.value;
      if (jti) {
        cookies().delete(`stuff-token-${username}`);
      }
    }
  }),
});
