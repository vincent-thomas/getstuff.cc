"use client";

import { api } from "@stuff/api-client/react";
import { MailOpen, ArchiveIcon, FolderInput } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "packages/components/lib/popover";
import { useAtom } from "jotai";
import { messagesIdSelected } from "../store/messages-id-selected";
import { useMemo } from "react";
import { z } from "zod";
import { H2 } from "@stuff/typography";
import { Flex } from "@stuff/structure";
import { useThreadsMoveMutation } from "@stuff/data-access/move-threads-mutation";
import { useThreadsReadMutation } from "@stuff/data-access/read-threads-mutation";

export const SelectedBar = ({
  folderId,
  threadIds
}: {
  folderId: string;
  threadIds: string[];
}) => {
  const utils = api.useUtils();
  const moveThreads = useThreadsMoveMutation();
  const setReadMutation = useThreadsReadMutation();
  const folders = api.mail.folders.listFolders.useQuery();

  const CONSTANT_folders = useMemo(() => {
    return [{id: "inbox", name: "Inbox"}]
  }, []);

  const otherFolders = useMemo(() => {
    return (folders.data ?? []).map(folder => ({name: folder.gsi2.split("|")[2], id: z.string().parse(folder.sk.split("|")[1])})).filter(folder => folder.id !== folderId)
  }, [folders.data,folderId]);

  const [selected, setSelected] = useAtom(messagesIdSelected)

  return (
    <div className="flex items-center gap-1">
        <Popover onOpenChange={(test) => {
          if (test === true) return;
          setSelected([])
        }}>
          <PopoverTrigger asChild>
            <button className="rounded-full p-3 p-3 hover:bg-muted">
              <FolderInput size={18} color="hsl(var(--foreground))" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-2">
            <H2>Move to</H2>
            <Flex col gap="5px">

            {CONSTANT_folders.map(folder => (
              <button key={folder.id} className="hover:bg-muted p-2 rounded-md" onClick={async () => {
                await moveThreads.mutateAsync({folderId: folderId, newFolderId: folder.id, threadIds: selected});
                setSelected([])
              }}>{folder.name}</button>
            ))}
            {otherFolders.length > 0 && <div className="w-full px-4 h-[1px] bg-muted"></div>}
            {otherFolders.map(folder => (
              <button key={folder.id} className="hover:bg-muted p-2 rounded-md" onClick={async () => {
               await moveThreads.mutateAsync({folderId: folderId, newFolderId: folder.id, threadIds: selected});
               setSelected([])
              }}>{folder.name}</button>
            ))}
            </Flex>

          </PopoverContent>
        </Popover>

      <button
        className="rounded-full p-3 p-3 hover:bg-muted"
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

    {folderId !== "archive" && (
      <button
          className="rounded-full p-3 p-3 hover:bg-muted"
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
      )}
    </div>
  );
};
