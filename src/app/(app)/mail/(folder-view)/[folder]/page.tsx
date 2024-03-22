import { api } from "@stuff/api-client/server";
import { notFound } from "next/navigation";
import { z } from "zod";
import { setupPage } from "@stuff/lib/setupPage";
import { ThreadView } from "./views/threads";
import { MainMailView } from "./views/main-mail-file";

export default setupPage({
  params: z.object({ folder: z.string() }),
  async Component({ params }) {
    const folderResult = await api.mail.folders.getFolder.query({
      folderId: params.folder
    })

    if (folderResult === undefined) {
      notFound()
    }

    const folder = {
      name: z.string().parse(folderResult === null ? params.folder : folderResult.gsi2.split("|")[2]),
      folderId: params.folder
    }

    const initialThreads = await api.mail.threads.getThreads.query({folderId: folder.folderId});

    return (
      <main className="flex h-full w-full overflow-y-auto bg-background rounded-lg border-border border">
        <MainMailView folder={folder} initialThreads={initialThreads} />
        <ThreadView folderId={folder.folderId}/>
      </main>
    )
  }
});
