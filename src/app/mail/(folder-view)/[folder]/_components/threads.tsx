"use client";
import { cn } from "packages/components/utils";
import { Checked, UnChecked } from "packages/icons/lib/unchecked";
import { RefreshButton } from "./refresh-button";
import { api } from "@stuff/api-client/react";
import { formatDistanceToNow } from "date-fns";
import { useAtom } from "jotai";
import { messagesIdSelected } from "../store/messages-id-selected";
import { SelectedBar } from "./selected-bar";
import { Flex } from "packages/components/lib/flex";
import { ScrollArea } from "packages/components/lib/scroll-area";
import { useRouter } from "next/navigation";
import { useThreadsQuery } from "@/data-access/get-threads-query";

const headerHeight = 18 + 0.25 * 4 * 2 * 16;

export const Threads = ({
  folderId,
  threads
}: {
  folderId: string;
  threads: ReturnType<typeof api.mail.threads.getThreads.useQuery>["data"];
}) => {
  const threadsQuery = useThreadsQuery(
    { folderId },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    { initialData: threads as any }
  );
  const [selected, setSelected] = useAtom(messagesIdSelected);
  const router = useRouter();
  const utils = api.useUtils();

  return (
    <Flex col className="h-full">
      <header
        style={{ height: `${headerHeight}px` }}
        className={cn("flex w-full items-center border-b border-border")}
      >
        <button
          className="m-1 rounded-full p-3 hover:bg-accent"
          onClick={() => {
            setSelected([]);
            if (selected.length !== threadsQuery.data?.length) {
              for (const thread of threadsQuery.data || []) {
                setSelected(value => [...value, thread.threadId]);
              }
            }
          }}
        >
          {selected.length === threadsQuery.data?.length &&
          threadsQuery.data.length !== 0 ? (
            <Checked size={18} />
          ) : (
            <UnChecked size={18} />
          )}
        </button>

        <h1 className="pb-1 text-xl text-foreground">{folderId}</h1>
        <div className="ml-auto mr-5">
          {selected.length === 0 ? (
            <RefreshButton folderId={folderId} />
          ) : (
            <SelectedBar threadIds={selected} folderId={folderId} />
          )}
        </div>
      </header>
      <div className="grow overflow-y-auto">
        <ScrollArea className="h-full">
          {threadsQuery.data?.map(thread => {
            return (
              <div
                key={thread.threadId}
                className={cn(
                  "flex items-center border-b border-border",
                  thread.read ? "bg-muted" : "bg-background",
                  selected.includes(thread.threadId) && "bg-accent"
                )}
              >
                <div className="p-1">
                  <button
                    className="rounded-full p-3 hover:bg-accent"
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
                    {selected.includes(thread.threadId) ? (
                      <Checked size={18} />
                    ) : (
                      <UnChecked size={18} />
                    )}
                  </button>
                </div>

                <button
                  key={thread.threadId}
                  className="flex grow items-center gap-8 py-3 pr-5 text-left"
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
                  }}
                  onClick={async () => {
                    router.push("/mail/" + folderId + "/" + thread.threadId);
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
          })}
        </ScrollArea>
      </div>
    </Flex>
  );
};
