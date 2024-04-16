import { api as apiServer } from "@stuff/api-client/server";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import type { FC } from "react";
import { z } from "zod";
import { FolderHeaderInternal } from "./header-client";

export const FolderHeader: FC<{ folderId: string }> = async ({ folderId }) => {
  unstable_noStore();
  const folderResult = await apiServer.mail.folders.getFolder.query({
    folderId,
  });

  if (folderResult === undefined) {
    redirect("/mail/inbox");
  }
  const name =
    folderResult === null
      ? folderId
      : z.string().parse(folderResult?.gsi2.split("|")?.[2]);

  return <FolderHeaderInternal folderId={folderId} name={name} />;
};
