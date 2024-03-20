"use client";

import { useState } from "react";
import { Refresh } from "../icons/refresh";
import { api } from "@stuff/api-client/react";
import { Loading } from "packages/icons";

export const RefreshButton = ({ folderId }: { folderId: string }) => {
  const { refetch } = api.mail.threads.getThreads.useQuery({
    folderId
  });
  const [isFetching, setFetching] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
      className="hover:bg-muted rounded-full p-2"
        disabled={isFetching}
        onClick={async () => {
          setFetching(true);
          await refetch();
          setFetching(false);
        }}
      >
        {isFetching ? (
          <Loading size={24} color="hsl(var(--muted-foreground))" />
        ) : (
          <Refresh />
        )}
      </button>
    </div>
  );
};
