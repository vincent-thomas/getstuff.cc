import { accountsRouter } from "backend/routers/accounts";
import { userRouter } from "./routers/user";
import { mailRouter } from "./routers/mail";
import { customerRouter } from "./routers/customer";
import { router } from "./trpc";
import { extensionsRouter } from "./routers/extensions";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  accounts: accountsRouter,
  user: userRouter,
  mail: mailRouter,
  customer: customerRouter,
  extensions: extensionsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
