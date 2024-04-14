"use client";
import type { FC } from "react";

import { api } from "@stuff/api-client/react";
import { Flex } from "@stuff/structure";
import { H2, P } from "@stuff/typography";
import { MailRow } from "./mail-row";
export interface FolderHeader {
  folderId: string;
  searchQuery?: string;
}

export const MailTable: FC<FolderHeader> = ({ folderId, searchQuery }) => {
  const { data: threads } = api.mail.threads.getThreads.useQuery({
    folderId: folderId,
    searchQuery,
  });

  if (threads === undefined) {
    return <></>;
  }

  if (threads.length === 0) {
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
    <div className={cn(css({ overflowY: "auto" }))}>
      {threads.map((thread) => (
        <MailRow key={thread.threadId} thread={thread} folderId={folderId} />
      ))}
    </div>
  );
};
