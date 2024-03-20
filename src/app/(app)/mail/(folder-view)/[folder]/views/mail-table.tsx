import { api } from "@stuff/api-client/react";
import { ScrollArea } from "packages/components/lib/scroll-area";
import { cn } from "packages/components/utils";
import { useRef, type FC, useEffect } from "react";
import { messagesIdSelected } from "../store/messages-id-selected";
import { useAtom } from "jotai";
import { Checked, UnChecked } from "packages/icons/lib/unchecked";
import { formatDistanceToNow } from "date-fns";
import autoAnimate from "@formkit/auto-animate";
import { Loading } from "packages/icons";
import { Flex } from "@stuff/structure";
import { H2, P } from "@stuff/typography";
import { useRouter } from "next/navigation";
import { prefetchThreadQuery } from "@stuff/data-access/prefetch-thread-query";
import { useDataKey } from "@stuff/lib/useUserPrivateKey";
import { useQueryClient } from "@tanstack/react-query";
import { threadOpen } from "../store/thread-open";

interface FolderHeader {
  folderId: string;
}

const MailRow = ({
  thread,
  folderId,
  whenPrefetching
}: {
  folderId: string;
  whenPrefetching: () => Promise<void>;
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
  const [isThreadOpen, setThreadOpen] = useAtom(threadOpen);


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
          await whenPrefetching();
        }}
        onClick={
           () => {
            setThreadOpen(thread.threadId);
            router.replace(`/mail/${folderId}?threadId=${thread.threadId}`)
        }
      }
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

export const MailTable: FC<FolderHeader> = ({ folderId }) => {
  const threadsQuery = api.mail.threads.getThreads.useQuery({ folderId });

  const parent = useRef(null);
  const qC = useQueryClient();
  const dataKey = useDataKey();
  const utils = api.useUtils();

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  if (threadsQuery.data === undefined) {
    return (
      <Flex justify="center" align="center" className="w-full py-10">
        <Loading color="hsl(var(--primary))" size={24} />
      </Flex>
    );
  }

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
        <div ref={parent}>
          {threadsQuery.data.map(thread => (
            <MailRow
              key={thread.threadId}
              thread={thread}
              folderId={folderId}
              whenPrefetching={async () => {
                const cachedThread = utils.mail.threads.getThread.getData({
                  folderId,
                  threadId: thread.threadId
                });
      
                if (cachedThread === undefined || cachedThread === null) {
                  throw new Error("NO CACHE")
                }
      
                if (dataKey === undefined) {
                  throw new Error("NO DATA KEY")
                }
                
                await prefetchThreadQuery({messages: cachedThread.messages, dataKey, queryClient: qC})
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
