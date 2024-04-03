import { z } from "zod";
import { getJwtId, verifyJwt } from "./jwt";
import type { Redis } from "@upstash/redis";

export async function getUserFromHeader(
	cookies: Record<string, string>,
	redis: Redis,
) {
	if (cookies["stuff-active"]) {
		try {
			const active = cookies["stuff-active"];
			if (active === undefined) {
				return null;
			}
			const jwt = cookies["stuff-token-" + active];

			if (jwt === undefined) {
				return null;
			}
			const jwtId = getJwtId(jwt);
			const jwtToken = z.string().parse(await redis.get(`session:${jwtId}`));

			const user = verifyJwt(jwt, jwtToken);

			return user;
		} catch (e) {
			console.error(e);
			return null;
		}
	}
	return null;
}
