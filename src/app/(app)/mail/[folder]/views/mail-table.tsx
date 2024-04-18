import type { FC } from "react";

import { api } from "@stuff/api-client/server";
import { MailRow } from "./mail-row";
import { NewMailListener } from "./mail-row-subscriber";
export interface FolderHeader {
  folderId: string;
  searchQuery?: string;
}

export const MailTable: FC<FolderHeader> = async ({
  folderId,
  searchQuery,
}) => {
  const threads = await api.mail.threads.getThreads.query({
    folderId: folderId,
    searchQuery,
  });

  // if (threads.length === 0) {
  //   return (
  //     <Flex
  //       col
  //       gap="0.25rem"
  //       justify="center"
  //       align="center"
  //       className="w-full py-10"
  //     >
  //       <H2>No threads!</H2>
  //       <P>Totally empty here</P>
  //     </Flex>
  //   );
  // }

  return (
    <div className={cn(css({ overflowY: "auto" }))}>
      <NewMailListener folderId={folderId} />
      {threads.map(thread => (
        <MailRow
          key={thread.thread_view.threadId}
          thread={{
            title: thread.thread.title,
            lastActive: thread.thread_view.lastActive ?? new Date(),
            read: thread.thread_view.read,
            threadId: thread.thread.threadId,
          }}
          folderId={folderId}
        />
      ))}
    </div>
  );
};
