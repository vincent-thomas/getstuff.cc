import { protectedProc, router } from "packages/api/trpc";
import { z } from "zod";

const STANDARD_FOLDER_IDS = ["inbox", "sent", "drafts", "archive"];

export const foldersRouter = router({
  folderExists: protectedProc
    .input(z.object({ folderId: z.string() }))
    .query(async ({ input: { folderId } }) => {
      return STANDARD_FOLDER_IDS.includes(folderId);
    })
});
