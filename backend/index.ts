import { accountsRouter } from "backend/routers/accounts";
import { userRouter } from "./routers/user";
import { mailRouter } from "./routers/mail";
import { customerRouter } from "./routers/customer";
import { protectedProc, router } from "./trpc";
import { extensionsRouter } from "./routers/extensions";
import { z } from "zod";
export const appRouter = router({
  accounts: accountsRouter,
  user: userRouter,
  mail: mailRouter,
  customer: customerRouter,
  extensions: extensionsRouter,

  addItemInSub: protectedProc.input(z.object({folderId: z.string(), thread: z.object({
    threadId: z.string(),
    read: z.boolean(),
    title: z.string(),
    lastActive: z.number()
  })})).mutation(async ({ctx,input}) => {
    
    await ctx.kafka.send({
      topic: `new-mail-${ctx.session.username}`,
      messages: [{
        value: JSON.stringify({
          folderId: input.folderId,
          thread: input.thread
        })
      }]
    })
  })
});

export type AppRouter = typeof appRouter;
