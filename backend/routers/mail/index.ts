import { threadsRouter } from "./threads";
import { foldersRouter } from "./folders";
import { sendMailRouter } from "./send-mail";
import { router } from "backend/trpc";

export const mailRouter = router({
  threads: threadsRouter,
  folders: foldersRouter,
  sendMail: sendMailRouter
});
