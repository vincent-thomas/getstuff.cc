import { router } from "backend/trpc";
// import { foldersRouter } from "./folders";
import { sendMailRouter } from "./send-mail";

export const mailRouter = router({
  // folders: foldersRouter,
  sendMail: sendMailRouter,
});
