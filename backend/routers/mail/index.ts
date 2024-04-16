import { router } from "backend/trpc";
import { foldersRouter } from "./folders";
import { sendMailRouter } from "./send-mail";
import { threadsRouter } from "./threads";

export const mailRouter = router({
  threads: threadsRouter,
  folders: foldersRouter,
  sendMail: sendMailRouter,
});
