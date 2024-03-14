import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Threads } from "./_components/threads";
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

    // const threads = await api.mail.threads.getThreads.query({
    //   folderId: params.folder
    // });

    // if (threads.length === 0) {
    //   return (
    //     <div className="flex h-full w-full items-center justify-center">
    //       <h1 className="text-2xl text-muted-foreground">
    //         {params.folder} is empty!
    //       </h1>
    //     </div>
    //   );
    // }
    return <Threads folderId={params.folder} threads={[]} />;
  }
});
