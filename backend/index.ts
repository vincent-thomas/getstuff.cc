import { accountsRouter } from "backend/routers/accounts";
import { customerRouter } from "./routers/customer";
import { userRouter } from "./routers/user";
import { router } from "./trpc";
import { mailRelayRouter } from "./routers/mail-relay";
export const appRouter = router({
  accounts: accountsRouter,
  user: userRouter,
  //  mail: mailRouter,
  customer: customerRouter,
  mailRelay: mailRelayRouter,
  // addItemInSub: protectedProc.input(z.object({folderId: z.string(), thread: z.object({
  //   threadId: z.string(),
  //   read: z.boolean(),
  //   title: z.string(),
  //   lastActive: z.number()
  // })})).mutation(async ({ctx,input}) => {

  //   await ctx.kafka.send({
  //     topic: `new-mail-${ctx.session.username}`,
  //     messages: [{
  //       value: JSON.stringify({
  //         folderId: input.folderId,
  //         thread: input.thread
  //       })
  //     }]
  //   })
  // })
});

export type AppRouter = typeof appRouter;
