import { accountsRouter } from "backend/routers/accounts";
import { userRouter } from "./routers/user";
import { mailRouter } from "./routers/mail";
import { customerRouter } from "./routers/customer";
import { protectedProc, router } from "./trpc";
import { extensionsRouter } from "./routers/extensions";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */


interface Post {
  message: string;
}

const ee = new EventEmitter();

export const appRouter = router({
  accounts: accountsRouter,
  user: userRouter,
  mail: mailRouter,
  customer: customerRouter,
  extensions: extensionsRouter,

  testingSubscriptions: protectedProc.subscription(() => {
    return observable<Post>((emit) => {
             // logic that will execute on subscription start
            const interval = setInterval(() => emit.next(new Date()), 1000);
            // function to clean up and close interval after end of connection
            return () => {
                clearInterval(interval);
            }
      // const onAdd = (data: Post) => {
      //   emit.next(data);
      // }

      // ee.on("add", onAdd);

      // return () => {
      //   ee.off("add", onAdd);
      // }
    })
  }),
  addItemInSub: protectedProc.mutation(() => {
    const post = {
      message: "testgin"
    }
    ee.emit("add", post)

    return post;
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
