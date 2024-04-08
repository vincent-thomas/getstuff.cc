import { z } from "zod";

import { getDyn } from "../sdks/dyn";
import { getStripe } from "../sdks/stripe";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { userInterface } from "../interfaces/user";
import { customerInterface } from "../interfaces/customer";
import { TRPCError } from "@trpc/server";
import { getCustomer, getUser } from "../utils/getUser";
import {
	deriveSession,
	generateEphemeral,
} from "secure-remote-password/server";
import { randomBytes } from "crypto";
import { createJwt } from "../utils/jwt";
import { cookies } from "next/headers";
import { getCustomerTable, getUserTable } from "packages/infra-constants/table";
import { protectedProc, pubProc, router } from "backend/trpc";

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
				const dyn = getDyn();
				const stripe = await getStripe();
				const commandIfUserExists = new GetCommand({
					TableName: getUserTable(env.STAGE),
					Key: {
						user_id: username,
					},
				});

				const userExists = await dyn.send(commandIfUserExists);
				if (userExists.Item) {
					throw new TRPCError({
						code: "CONFLICT",
						message: "Username already exists",
					});
				}
				const response = await stripe.customers.create({
					email: `${username}@getstuff.cc`,
					name: username,
				});

				const command = new PutCommand({
					TableName: getUserTable(env.STAGE),
					Item: userInterface.parse({
						user_id: username,
						created_at: Date.now(),
						customerId: response.id,
						salt,
						name,
						encryptedUserData,
						publicKey,
						encryptedDataKey,
						verifier,
					}),
				});
				try {
					await dyn.send(command);
				} catch {
					await stripe.customers.del(response.id);
					throw {
						code: "ALREADY_EXISTS",
						message: "Account exists with username",
					};
				}

				const command2 = new PutCommand({
					TableName: getCustomerTable(env.STAGE),
					Item: customerInterface.parse({
						customer_id: response.id,
						cancel_at: null,
						created_at: Date.now(),
						status: "inactive",
						canceled_at: null,
					} satisfies z.infer<typeof customerInterface>),
				});

				await dyn.send(command2);
			},
		),
	initAccountSession: pubProc
		.input(z.object({ username: z.string() }))
		.output(z.object({ salt: z.string(), serverEphemeralPublic: z.string() }))
		.mutation(async ({ ctx: { redis }, input: { username } }) => {
			const dyn = getDyn();
			const user = await getUser(dyn, env.STAGE, username);

			if (user === undefined) {
				logger.debug("user doesnt exist, sending random response")
				// Random response to prevent knowing that username doesn't exist
				return {
					salt: randomBytes(64).toString("hex"),
					serverEphemeralPublic: randomBytes(512).toString("hex"),
				};
			}

			const serverEphemeral = generateEphemeral(user.verifier);
			await redis.set(username, serverEphemeral.secret, { ex: 60 * 5 });

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
				const dyn = getDyn();
				const user = await getUser(dyn, env.STAGE, username);

				try {
					if (user === undefined) {
						logger.debug("user doesnt exist, user_id=" + username);
						throw {};
					}
					const customer = await getCustomer(dyn, env.STAGE, user.customerId);
					if (customer === undefined) {
						logger.error("CUSTOMER DOESNT EXIST: " + username);
						throw {};
					}
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
					cookies().set("stuff-token-" + username, jwt, {
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
				} catch (e) {
					throw { code: "NOT_FOUND", message: "Invalid credentials" };
				}
			},
		),
	logout: protectedProc.mutation(async ({ ctx }) => {
		const username = cookies().get("stuff-active")?.value;
		cookies().delete("stuff-active");

		if (username) {
			const jti = cookies().get("stuff-token-" + username)?.value;
			if (jti) {
				cookies().delete("stuff-token-" + username);
			}
		}
	}),
});
