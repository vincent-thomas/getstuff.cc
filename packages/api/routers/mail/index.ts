import { router } from "packages/api/trpc";
import { threadsRouter } from "./threads";
import { foldersRouter } from "./folders";
import { sendMailRouter } from "./send-mail";

export const mailRouter = router({
  threads: threadsRouter,
  folders: foldersRouter,
  sendMail: sendMailRouter
});
