import { accountsRouter } from "packages/api/routers/accounts";
import { router } from "packages/api/trpc";
import { userRouter } from "./routers/user";
import { mailRouter } from "./routers/mail";
import { customerRouter } from "./routers/customer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  accounts: accountsRouter,
  user: userRouter,
  mail: mailRouter,
  customer: customerRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
