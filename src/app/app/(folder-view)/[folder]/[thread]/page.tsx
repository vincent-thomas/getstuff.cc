import { setupPage } from "@/lib/setupPage";
import { z } from "zod";
import { Page } from "./page-client";

export default setupPage({
  params: z.object({
    folder: z.string(),
    thread: z.string()
  }),
  async Component({ params }) {
    return <Page folderId={params.folder} threadId={params.thread} />;
  }
});
