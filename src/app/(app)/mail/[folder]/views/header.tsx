import { api as apiServer } from "@stuff/api-client/server";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import type { FC } from "react";
import { FolderHeaderInternal } from "./header-client";

interface FolderHeader {
  folder: { name: string; folderId: string };
}

export const FolderHeader: FC<{ folderId: string }> = async ({ folderId }) => {
  unstable_noStore();
  const folderResult = await apiServer.mail.folders.getFolder.query({
    folderId,
  });

  if (folderResult === undefined) {
    redirect("/mail/inbox");
  }
  const name =
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    folderResult === null ? folderId : folderResult?.gsi2.split("|")?.[2]!;

  return <FolderHeaderInternal folderId={folderId} name={name} />;
};
