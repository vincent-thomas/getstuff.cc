import { getRedis } from "backend/sdks";
import { createJwt } from "backend/utils/jwt";
import { getUserFromEmail } from "backend/utils/user";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const redis = await getRedis(env.AWS_REGION, env.STAGE);

export const GET = async (
  req: NextRequest,
  { params: { linkId } }: { params: { linkId: string } },
) => {
  const email = await redis.get(`auth:magic-link:${linkId}`);

  if (email === null) {
    return Response.json(
      { error: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const user = await getUserFromEmail(email);

  if (user === undefined) {
    logger.error("user doesn't exist when creating cookie");
    return new NextResponse("Error: User doesn't exist");
  }

  const jwt = await createJwt(user.userId, user.customerId, user.status);

  cookies().set("token", jwt, {
    secure: true,
    httpOnly: true,
  });

  return Response.redirect(`${env.APP_URL}/app`);
};
