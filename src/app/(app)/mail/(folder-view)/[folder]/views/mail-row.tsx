"use client";

import { api } from "@stuff/api-client/react";
import { cn } from "packages/components/utils";
import { messagesIdSelected } from "../store/messages-id-selected";
import { useAtom } from "jotai";
import { Checked, UnChecked } from "packages/icons/lib/unchecked";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { prefetchThreadQuery } from "@stuff/data-access/prefetch-thread-query";
import { useDataKey } from "@stuff/lib/useUserPrivateKey";
import { useQueryClient } from "@tanstack/react-query";
import { threadOpen } from "../store/thread-open";

export const MailRow = ({
  thread,
  folderId,
}: {
  folderId: string;
  thread: {
    threadId: string;
    read: boolean;
    title: string;
    lastActive: number;
  };
}) => {
  const [selected, setSelected] = useAtom(messagesIdSelected);
  const utils = api.useUtils();
  const router = useRouter();
  const [threadId, setThreadId] = useAtom(threadOpen)
  const dataKey = useDataKey();
  const qC = useQueryClient();

  return (
    <div
      key={thread.threadId}
      className={cn(
        "flex border-b border-border",
        thread.read ? "bg-accent" : "bg-background",
        selected.includes(thread.threadId) && "bg-muted"
      )}
    >
      <div className="p-1">
        <button
          className="rounded-full p-3 hover:bg-muted"
          onClick={() => {
            if (selected.includes(thread.threadId)) {
              setSelected(
                selected.filter(id => id !== thread.threadId)
              );
            } else {
              setSelected([...selected, thread.threadId]);
            }
          }}
        >
        {selected.includes(thread.threadId) ? <Checked size={18} /> : <UnChecked size={18} />}
        </button>
      </div>

      <button
        key={thread.threadId}
        className="flex grow items-center gap-8 py-3 pr-5 text-left"
        onClick={() => {
          setThreadId(thread.threadId);
          window.history.replaceState({}, "", `/mail/${folderId}?threadId=${thread.threadId}`)
        }}
        onMouseOver={async () => {
          await utils.mail.threads.getThread.prefetch(
            {
              folderId,
              threadId: thread.threadId
            },
            {
              staleTime: 10_000
            }
          );
          const cachedThread = await utils.mail.threads.getThread.ensureData({
            folderId,
            threadId: thread.threadId
          });
  
          if (cachedThread === null || dataKey === undefined) {
            return;
          }
          await prefetchThreadQuery({messages: cachedThread.messages, dataKey, queryClient: qC})
        }}
      >
        <p
          className={cn(
            "grow",
            !thread.read ? "font-semibold" : "text-muted-foreground"
          )}
        >
          {thread.title}
        </p>
        <div className={cn("text-foreground")}>
          {formatDistanceToNow(new Date(thread.lastActive), {
            addSuffix: true
          })}
        </div>
        <div className="w-16 text-right text-muted-foreground">
          <i>{thread.read ? "read" : "not read"}</i>
        </div>
      </button>
    </div>
  );
};