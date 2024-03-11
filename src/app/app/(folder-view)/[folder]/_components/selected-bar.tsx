"use client";

import { useAtom } from "jotai";
import { messagesIdSelected } from "../store/messages-id-selected";
import { api } from "@stuff/api-client/react";
import { MailOpen, ArchiveIcon, FolderInput } from "lucide-react";

export const SelectedBar = ({ folderId }: { folderId: string }) => {
  const [selected, setSelected] = useAtom(messagesIdSelected);
  const threadsQuery = api.mail.threads.getThreads.useQuery({ folderId });
  const moveThreads = api.mail.threads.moveThreads.useMutation();
  const utils = api.useUtils();

  return (
    <div className="flex items-center gap-1 p-1">
      <button className="rounded-full p-3 p-3 hover:bg-accent">
        <FolderInput size={18} color="hsl(var(--foreground))" />
      </button>

      <button className="rounded-full p-3 p-3 hover:bg-accent">
        <MailOpen size={18} color="hsl(var(--foreground))" />
      </button>

      <button
        className="rounded-full p-3 p-3 hover:bg-accent"
        onClick={async () => {
          const successed = await moveThreads.mutateAsync({
            folderId,
            newFolderId: "archive",
            threadIds: selected
          });
          if (successed.includes(false)) {
            alert("Some threads failed to move");
          }
          await utils.mail.threads.getThreads.invalidate({ folderId });
          setSelected([]);
        }}
      >
        <ArchiveIcon size={18} color="hsl(var(--foreground))" />
      </button>
      <span className="ml-2">
        {selected.length === threadsQuery.data?.length
          ? "All (" + selected.length + ")"
          : selected.length}{" "}
        Selected
      </span>
    </div>
  );
};
