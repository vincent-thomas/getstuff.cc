"use client";

import type { FC } from "react";

import { MailRow } from "./mail-row";
import { Flex } from "@stuff/structure";
import { H2, P } from "@stuff/typography";
import { api } from "@stuff/api-client/react";

interface FolderHeader {
  folderId: string;
  initialThreadsData: {
    threadId: string;
    title: string;
    lastActive: number;
    read: boolean;
  }[]
}

export const MailTable: FC<FolderHeader> =  ({ folderId, initialThreadsData }) => {
  const threadsQuery = api.mail.threads.getThreads.useQuery({ folderId });


  if (threadsQuery.data?.length === 0) {
    return (
      <Flex
        col
        gap="0.25rem"
        justify="center"
        align="center"
        className="w-full py-10"
      >
        <H2>No threads!</H2>
        <P>Totally empty here</P>
      </Flex>
    );
  }

  return (
    <div className="grow overflow-y-auto">
      <div className="h-full">
        <div>
          {(threadsQuery.data ?? initialThreadsData).map(thread => (
            <MailRow
              key={thread.threadId}
              thread={thread}
              folderId={folderId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
