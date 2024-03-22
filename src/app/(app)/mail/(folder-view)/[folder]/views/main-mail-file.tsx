"use client";

import { Suspense } from "react"
import { type FolderHeader as IFolderHeader, MailTable } from "./mail-table"
import { FolderHeader } from "./header";
import { useSearchParams } from "next/navigation";
import { cn } from "@stuff/components/utils";
import S from "./main-mail-file.module.css"

export const MainMailView = ({folder, initialThreads}: {folder: {folderId:string; name:string}, initialThreads: IFolderHeader["initialThreadsData"]}) => {

  const search = useSearchParams();

  return (
    <div className={cn("h-full grow flex flex-col w-full", search.get("threadId") !== null && S.removeMainMobile)}>
      <FolderHeader folder={folder} />
      <Suspense>
        <MailTable folderId={folder.folderId} initialThreadsData={initialThreads} />
      </Suspense>
    </div>
  )
}