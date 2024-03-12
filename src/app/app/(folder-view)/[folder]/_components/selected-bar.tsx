"use client";

import { api } from "@stuff/api-client/react";
import { MailOpen, ArchiveIcon, FolderInput } from "lucide-react";

export const SelectedBar = ({
  folderId,
  whenDone,
  threadIds
}: {
  folderId: string;
  threadIds: string[];
  whenDone?: (action: "archive" | "move" | "set-unread") => void;
}) => {
  const moveThreads = api.mail.threads.moveThreads.useMutation();
  const setReadMutation = api.mail.threads.setRead.useMutation();
  const utils = api.useUtils();

  return (
    <div className="flex items-center gap-1">
      <button className="rounded-full p-3 p-3 hover:bg-accent">
        <FolderInput size={18} color="hsl(var(--foreground))" />
      </button>

      <button className="rounded-full p-3 p-3 hover:bg-accent">
        <MailOpen
          size={18}
          color="hsl(var(--foreground))"
          onClick={async () => {
            await setReadMutation.mutateAsync({
              folderId,
              value: false,
              threadIds
            });
            await utils.mail.threads.getThreads.invalidate({ folderId });
            if (whenDone) {
              whenDone("set-unread");
            }
          }}
        />
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
          if (whenDone) {
            whenDone("archive");
          }
        }}
      >
        <ArchiveIcon size={18} color="hsl(var(--foreground))" />
      </button>
    </div>
  );
};
