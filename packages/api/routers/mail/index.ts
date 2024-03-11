import { router } from "packages/api/trpc";
import { threadsRouter } from "./threads";
import { foldersRouter } from "./folders";

export const mailRouter = router({
  threads: threadsRouter,
  folders: foldersRouter
});
