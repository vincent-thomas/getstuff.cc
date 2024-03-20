"use client";

import { Flex } from "@stuff/structure";
import { FolderHeader } from "./views/header";
import { MailTable } from "./views/mail-table";
import { ThreadView } from "./views/thread";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { threadOpen } from "./store/thread-open";
import { useEffect, useState } from "react";
import { Page } from "./[thread]/page-client";

export const PageClient = ({
  folderId,
  folder
}: {
  folderId: string;
  folder: {name: string; folderId:string;}
}) => {
  
  const search = useSearchParams();
  const threadId = search.get("threadId");
  const [isThreadOpen, setThreadOpen] = useAtom(threadOpen);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    setThreadOpen(threadId)
  }, [threadId])
  
  return (
    <div className="flex w-full h-full h-[calc(100%-var(--space-md))]">
      <main className="grow bg-background rounded-lg border-border border w-full">
        <Flex col className="h-full grow">
          <FolderHeader folderId={folderId} folder={folder} />
          <MailTable folderId={folderId} />
        </Flex>
      </main>
      {isThreadOpen !== null && 
      <div className="grow pl-space-md min-w-[400px]" style={{width: `${width}px`}}>
        <div className="rounded-lg bg-background h-full border-border border w-full">
          <Page threadId={isThreadOpen} folderId={folderId} determineWidth={(width) => {
            setWidth(width)
          }} />
        </div>
      </div>}
    </div>
  )
};