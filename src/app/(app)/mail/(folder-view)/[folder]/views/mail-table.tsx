import { api } from "@stuff/api-client/react";
import { ScrollArea } from "packages/components/lib/scroll-area";
import { cn } from "packages/components/utils";
import { useRef, type FC, useEffect } from "react";
import { messagesIdSelected } from "../store/messages-id-selected";
import { useAtom } from "jotai";
import { Checked, UnChecked } from "packages/icons/lib/unchecked";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import autoAnimate from '@formkit/auto-animate'
import { Loading } from "packages/icons";
import { Flex } from "@stuff/structure/flex";
import { H2, P } from "@stuff/typography";

interface FolderHeader {
  folderId: string;

}

const MailRow = ({thread, folderId}: {folderId:string;thread: {threadId: string, read: boolean, title: string, lastActive:number}}) => {
  const [selected, setSelected] = useAtom(messagesIdSelected);
  const utils = api.useUtils();
  const router = useRouter();

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
  )
}

export const MailTable:FC<FolderHeader> = ({folderId}) => {
  const threadsQuery = api.mail.threads.getThreads.useQuery({ folderId });

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  if (threadsQuery.isLoading ?? threadsQuery?.data === undefined) {
    return (
      <Flex justify="center" align="center" className="py-10 w-full">
        <Loading color="hsl(var(--primary))" size={24}/>
      </Flex>
    )
  }

  if (threadsQuery.data.length === 0) {
    return (
      <Flex col gap="0.25rem" justify="center" align="center" className="py-10 w-full">
        <H2>No threads!</H2>
        <P>Totally empty here</P>
      </Flex>
    )
  }

  return (
    <div className="grow overflow-y-auto">
    <ScrollArea className="h-full" >
      <div ref={parent}>
        {threadsQuery.data.map(thread => <MailRow key={thread.threadId} thread={thread} folderId={folderId} />)}
        </div>
    </ScrollArea>
  </div>
  )
}