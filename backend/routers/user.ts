import { getUser } from "backend/utils/user";
import { protectedProc, pubProc, router } from "../trpc";

export const userRouter = router({
  encryptedData: protectedProc.query(async ({ ctx: { session } }) => {
    const user = (await getUser(session.userId))!;

    return {
      email: user.email,
      name: user.name,
      has_plus: user.status === "active",
    };
  }),
  session: pubProc.query(({ ctx: { session } }) => {
    return session;
  }),
});
