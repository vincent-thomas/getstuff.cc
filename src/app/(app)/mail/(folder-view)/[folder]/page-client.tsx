"use client";

import { Flex } from "@stuff/structure";
import { FolderHeader } from "./views/header";
import { MailTable } from "./views/mail-table";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { threadOpen } from "./store/thread-open";
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@stuff/ui/resizable"
import { ThreadView } from "./views/threads";

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

  useEffect(() => {
    setThreadOpen(threadId)
  }, [threadId])
  
  return (
      <ResizablePanelGroup direction="horizontal" className="flex w-full !h-[calc(100%-var(--space-md))] gap-[calc(var(--space-md)/2)]">
        <ResizablePanel>
          <main className="bg-background rounded-lg border-border border w-full h-full">
            <Flex col className="h-full grow">
              <FolderHeader folderId={folderId} folder={folder} />
              <MailTable folderId={folderId} />
            </Flex>
          </main>
        </ResizablePanel>
        {isThreadOpen !== null && 
          <>
            <ResizableHandle className="!bg-transparent" />
            <ResizablePanel defaultSize={24} className="max-w-[1074px] min-w-[540px]" >
              <div className="h-full">
                <div className="rounded-lg bg-background h-full border-border border w-full">
                  <ThreadView threadId={isThreadOpen} folderId={folderId}/>
                </div>
              </div>
            </ResizablePanel>
          </>
        }
      </ResizablePanelGroup>
  )
};