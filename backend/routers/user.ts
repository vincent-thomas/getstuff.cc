import { getCustomer, getUser } from "backend/utils/getUser";
import { protectedProc, pubProc, router } from "../trpc";

export const userRouter = router({
  encryptedData: protectedProc.query(async ({ ctx: { session } }) => {
    const user = (await getUser(session.username))!;
    const customer = (await getCustomer(user.customerId))!;

    return {
      encryptedUserData: user.encryptedUserData,
      encryptedDataKey: user.encryptedDataKey,
      username: user.username,
      name: user.name,
      has_plus: customer.status === "active",
    };
  }),
  session: pubProc.query(({ ctx: { session } }) => {
    return session;
  }),
});
