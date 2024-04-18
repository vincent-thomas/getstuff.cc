"use client";

import { api } from "@stuff/api-client/react";
import { useAtom } from "jotai";
import { Checked, UnChecked } from "packages/icons/lib/unchecked";
import type { FC } from "react";
import { SelectedBar } from "../_components/selected-bar";
import { messagesIdSelected } from "../store/messages-id-selected";

export const FolderHeaderInternal: FC<{ folderId: string; name: string }> = ({
  folderId,
  name,
}) => {
  const threadsQuery = api.mail.threads.getThreads.useQuery({
    folderId: folderId,
  });
  const [selected, setSelected] = useAtom(messagesIdSelected);

  return (
    <div
      style={{
        borderBottom: `1px solid ${palette.borderSubtle}`,
      }}
      className={cn(
        stack({ direction: "row", align: "center" }),
        css({ width: "full" }),
      )}
    >
      <div className={css({ p: "small" })}>
        <button
          type="button"
          className={cn(css({ color: "text1", p: "medium" }))}
          onClick={() => {
            setSelected([]);
            if (selected.length !== threadsQuery.data?.length) {
              for (const thread of threadsQuery.data ?? []) {
                setSelected(value => [...value, thread.thread.threadId]);
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
      </div>

      <h1 className={cn(css({ fontSize: "medium", color: "text2" }))}>
        {name}
      </h1>
      <div
        className={cn(
          stack({ justify: "end" }),
          css({ width: "full", height: "full", pX: "small" }),
        )}
      >
        {selected.length > 0 && (
          <SelectedBar threadIds={selected} folderId={folderId} />
        )}
      </div>
    </div>
  );
};
