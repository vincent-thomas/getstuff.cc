import { createJwt } from "@backend/utils/jwt";
import { getUserFromEmail } from "@backend/utils/user";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { Redis } from "ioredis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const innerRequest = async ({
  redis,
  db,
  params,
}: {
  redis: Redis;
  db: PostgresJsDatabase;
  params: { linkId: string };
}) => {
  const email = await redis.get(`auth:magic-link:${params.linkId}`);

  if (email === null) {
    return Response.json(
      { error: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const user = await getUserFromEmail(db, email);

  if (user === undefined) {
    logger.error("user doesn't exist when creating cookie");
    return new NextResponse("Error: User doesn't exist", { status: 400 });
  }

  await redis.del(`auth:magic-link:${params.linkId}`);
  const jwt = await createJwt(user.userId, user.customerId, user.status);

  cookies().set("token", jwt, {
    secure: true,
    httpOnly: true,
  });

  return Response.redirect(`${env.APP_URL}`);
};
