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

    const doesFolderExist = await api.mail.folders.folderExists.query({
      folderId: params.folder
    });

    if (!doesFolderExist) {
      redirect("/mail/inbox");
    }

    return <PageClient folderId={params.folder} threads={[]} />;
  }
});
