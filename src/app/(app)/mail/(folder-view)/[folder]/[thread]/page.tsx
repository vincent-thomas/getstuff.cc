import { z } from "zod";
import { Page } from "./page-client";
import { setupPage } from "@stuff/lib/setupPage";

export default setupPage({
  params: z.object({
    folder: z.string(),
    thread: z.string()
  }),
  async Component({ params }) {
    return <Page folderId={params.folder} threadId={params.thread} />;
  }
});
