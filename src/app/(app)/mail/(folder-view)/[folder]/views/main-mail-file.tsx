import { Suspense } from "react"
import { MailTable } from "./mail-table"
import { FolderHeader } from "./header";
import { cn } from "@stuff/components/utils";
import S from "./main-mail-file.module.css"

export const MainMailView = ({folder,threadId}: {folder: {folderId:string; name:string},threadId?:string}) => {
  return (
    <div className={cn("h-full grow flex flex-col w-full", threadId !== undefined && S.removeMainMobile)}>
      <FolderHeader folder={folder} />
      <Suspense>
        <MailTable folderId={folder.folderId} />
      </Suspense>
    </div>
  )
}