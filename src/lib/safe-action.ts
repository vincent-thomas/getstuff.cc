import { verifyJwt } from "@backend/utils/jwt";
import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";
export const protectedProc = createSafeActionClient({
  async middleware() {
    const jwt = cookies().get("token")?.value;
    if (!jwt) {
      throw new Error("Unauthorized");
    }

    try {
      const session = await verifyJwt(jwt);

      return { session };
    } catch {
      throw new Error("Unauthorized");
    }
  },
});

export const publicProc = createSafeActionClient();
