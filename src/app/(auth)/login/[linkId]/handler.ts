import { subscriptionTable } from "@backend/db/schema/subscriptions";
import { createJwt } from "@backend/utils/jwt";
import { getUserFromEmail } from "@backend/utils/user";
import { and, desc, eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { Redis } from "ioredis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const innerRequest = async ({
  redis,
  db,
  params,
}: {
  redis: Redis;
  db: NodePgDatabase;
  params: { linkId: string };
}) => {
  console.log("testing");
  const email = await redis.get(`auth:magic-link:${params.linkId}`);
  console.log(email);

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

  const subscription = await db
    .select()
    .from(subscriptionTable)
    .orderBy(desc(subscriptionTable.startDate))
    .where(and(eq(subscriptionTable.customerId, user.customerId)))
    .then(v => v?.[0]);

  const jwt = await createJwt(
    user.userId,
    user.customerId,
    subscription?.status,
  );

  cookies().set("token", jwt, {
    secure: true,
    httpOnly: true,
  });

  return NextResponse.redirect(`${env.APP_URL}`);
};
