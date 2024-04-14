import { getUserFromHeader } from "backend/utils/getUserFromHeaders";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./middlewares/auth";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|ios|android|windows11).*)",
  ],
};

export type Location = "IN_AUTH" | "IN_APP" | "OTHER";

const decideLocation = (pathname: string) => {
  if (pathname.startsWith("/mail")) return "IN_APP" as const;
  else if (pathname.startsWith("/auth")) return "IN_AUTH" as const;

  return "OTHER";
};

export async function middleware(request: NextRequest) {
  const active = request.cookies.get("stuff-active")?.value ?? "";
  const cookies = {
    "stuff-active": active,
    [`stuff-token-${active}`]:
      request.cookies.get(`stuff-token-${active}`)?.value ?? "",
  };
  const session = await getUserFromHeader(cookies);

  const location = decideLocation(request.nextUrl.pathname);
  const result = await authMiddleware(location, session);
  if (result !== null) {
    return result;
  }
}
