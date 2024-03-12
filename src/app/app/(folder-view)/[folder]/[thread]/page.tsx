import { setupPage } from "@/lib/setupPage";
import { z } from "zod";
import { Page } from "./page-client";
import { api } from "@stuff/api-client/server";

export default setupPage({
  params: z.object({
    folder: z.string(),
    thread: z.string()
  }),
  async Component({ params }) {
    const thread = await api.mail.threads.getThread.query({
      folderId: params.folder,
      threadId: params.thread
    });
    if (!thread?.thread.read) {
      await api.mail.threads.setRead.mutate({
        folderId: params.folder,
        threadIds: [params.thread],
        value: true
      });
    }

    return <Page folderId={params.folder} threadId={params.thread} />;
  }
});
