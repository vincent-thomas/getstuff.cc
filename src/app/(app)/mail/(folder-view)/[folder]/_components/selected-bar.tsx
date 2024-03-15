"use client";

import { api } from "@stuff/api-client/react";
import { MailOpen, ArchiveIcon, FolderInput } from "lucide-react";
import { useThreadsReadMutation } from "@/data-access/read-threads-mutation";

export const SelectedBar = ({
  folderId,
  threadIds
}: {
  folderId: string;
  threadIds: string[];
}) => {
  const utils = api.useUtils();
  const moveThreads = api.mail.threads.moveThreads.useMutation();
  const setReadMutation = useThreadsReadMutation();

  return (
    <div className="flex items-center gap-1">
      <button className="rounded-full p-3 p-3 hover:bg-accent">
        <FolderInput size={18} color="hsl(var(--foreground))" />
      </button>

      <button
        className="rounded-full p-3 p-3 hover:bg-accent"
        onClick={async () => {
          await setReadMutation.mutateAsync({
            folderId,
            value: false,
            threadIds
          });
        }}
      >
        <MailOpen size={18} color="hsl(var(--foreground))" />
      </button>

      <button
        className="rounded-full p-3 p-3 hover:bg-accent"
        onClick={async () => {
          const successed = await moveThreads.mutateAsync({
            folderId,
            newFolderId: "archive",
            threadIds
          });

          if (successed.includes(false)) {
            alert("Some threads failed to move");
          }
          await utils.mail.threads.getThreads.invalidate({ folderId });
        }}
      >
        <ArchiveIcon size={18} color="hsl(var(--foreground))" />
      </button>
    </div>
  );
};
