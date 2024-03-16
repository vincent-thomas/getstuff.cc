import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { PageClient } from "./page-client";
import { setupPage } from "@/lib/setupPage";

export default setupPage({
  params: z.object({ folder: z.string() }),
  async Component({ params }) {
    const session = await api.user.session.query();
    if (session === null) {
      redirect("/auth/identify");
    }

    const folderResult = await api.mail.folders.getFolder.query({
      folderId: params.folder
    })

    if (folderResult === undefined) {
      redirect("/mail/inbox");
    }
    const threads = await api.mail.threads.getThreads.query({
      folderId: params.folder
    })

    const folder = {
      name: z.string().parse(folderResult === null ? params.folder : folderResult.gsi2.split("|")[2]),
      folderId: params.folder
    }

    return <PageClient folderId={params.folder} threads={threads} folder={folder} />;
  }
});
