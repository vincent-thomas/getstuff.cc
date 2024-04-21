import { accountsRouter } from "backend/routers/accounts";
import { customerRouter } from "./routers/customer";
import { userRouter } from "./routers/user";
import { router } from "./trpc";
import { mailRelayRouter } from "./routers/mail-relay";
export const appRouter = router({
  accounts: accountsRouter,
  user: userRouter,
  customer: customerRouter,
  mailRelay: mailRelayRouter,
});

export type AppRouter = typeof appRouter;
