import { api } from "@stuff/api-client/server";
import { notFound } from "next/navigation";
import { z } from "zod";
import { setupPage } from "@stuff/lib/setupPage";
import { Flex } from "@stuff/structure";
import { FolderHeader } from "./views/header";
import { MailTable } from "./views/mail-table";
import { Suspense } from "react";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@stuff/ui/resizable"
import { ThreadView } from "./views/threads";

export default setupPage({
  params: z.object({ folder: z.string() }),
  query: z.object({hide: z.string().optional()}),
  async Component({ params,query }) {
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

    const initialThreads = await api.mail.threads.getThreads.query({folderId: folder.folderId})

    return (
      <div className="flex h-full pb-space-md w-full overflow-x-auto">
        <main className="bg-background rounded-lg border-border border flex w-full overflow-hidden">
          <Flex col className="h-full grow">
            <FolderHeader folder={folder} />
            <Suspense>
              <MailTable folderId={folder.folderId} initialThreadsData={initialThreads} />
            </Suspense>
          </Flex>
          <ThreadView folderId={folder.folderId}/>
        </main>
      </div>
    )
  }
});
