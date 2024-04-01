import { Suspense } from "react"
import { MailTable } from "./mail-table"
import { FolderHeader } from "./header";
import { cn } from "@stuff/components/utils";
import S from "./main-mail-file.module.css"
import { stack } from "src/components/recipies";
import { css } from "src/components/styler.css";

export const MainMailView = ({folder,threadId}: {folder: {folderId:string; name:string},threadId?:string}) => {
  return (
    <div className={cn(stack({direction: "col", grow: 1}),css({height: "full", width: "full"}), threadId !== undefined && S.removeMainMobile)}>
      <FolderHeader folder={folder} />
      <Suspense>
        <MailTable folderId={folder.folderId} />
      </Suspense>
    </div>
  )
}