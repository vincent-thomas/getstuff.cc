import type { NextRequest } from "next/server";
import { authMiddleware } from "./middlewares/auth";
import { verifyJwt } from "backend/utils/jwt";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|ios|android|windows11).*)",
  ],
};

export type Location = "IN_AUTH" | "IN_APP" | "OTHER";

const decideLocation = (pathname: string) => {
  if (pathname.startsWith("/mail")) {
    return "IN_APP" as const;
  }
  if (pathname.startsWith("/identify") || pathname.startsWith("/init")) {
    return "IN_AUTH" as const;
  }

  return "OTHER";
};

export async function middleware(request: NextRequest) {
  const active = request.cookies.get("token")?.value ?? "";

  const session = active !== "" ? await verifyJwt(active) : null;

  const location = decideLocation(request.nextUrl.pathname);
  const result = authMiddleware(location, session);
  if (result !== null) {
    return result;
  }
}
