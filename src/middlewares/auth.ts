import { env } from "@/env";
import type { jwtPayloadValidator } from "backend/utils/jwt";
import { NextResponse } from "next/server";
import type { Location } from "src/middleware";
import type { z } from "zod";

export const authMiddleware = (
  location: Location,
  session: z.infer<typeof jwtPayloadValidator> | null,
) => {
  if (location === "IN_AUTH" && session !== null) {
    return NextResponse.redirect(`${env.APP_URL}/app`);
  }
  if (location === "IN_APP" && session === null) {
    return NextResponse.redirect(`${env.APP_URL}/auth/identify`);
  }

  return null;
};
