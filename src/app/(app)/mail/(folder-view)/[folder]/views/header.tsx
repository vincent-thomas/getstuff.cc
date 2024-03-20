import { useAtom } from "jotai";
import { cn } from "packages/components/utils";
import { messagesIdSelected } from "../store/messages-id-selected";
import { api } from "@stuff/api-client/react";
import type { FC } from "react";
import { Checked, UnChecked } from "packages/icons/lib/unchecked";
import { RefreshButton } from "../_components/refresh-button";
import { SelectedBar } from "../_components/selected-bar";

const headerHeight = 18 + 0.25 * 4 * 2 * 16 + 10 // 10: padding;

interface FolderHeader {
  folderId: string;
  folder: {name: string; folderId:string;}
}

export const FolderHeader: FC<FolderHeader> = ({folderId, folder}) => {

  const threadsQuery = api.mail.threads.getThreads.useQuery({ folderId });

  const [selected, setSelected] = useAtom(messagesIdSelected);

  return (
    <header
      style={{ height: `${headerHeight}px` }}
      className={cn("flex w-full items-center border-b border-border")}
    >
      <button
        className="m-1 rounded-full p-3 hover:bg-accent"
        onClick={() => {
          setSelected([]);
          if (selected.length !== threadsQuery.data?.length) {
            for (const thread of threadsQuery.data ?? []) {
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

      <h1 className="pb-1 text-xl text-foreground">{folder.name}</h1>
      <div className="ml-auto mr-5">
        {selected.length === 0 ? (
          <RefreshButton folderId={folderId} />
        ) : (
          <SelectedBar threadIds={selected} folderId={folderId} />
        )}
      </div>
    </header>
  )
}