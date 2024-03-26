"use client";

import { useState } from "react";
import { Refresh } from "../icons/refresh";
import { useRouter } from "next/navigation";
import { Loading } from "@stuff/icons/loading";

export const RefreshButton = () => {
  const [isFetching, setFetching] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <button
      className="hover:bg-muted rounded-full p-2"
        disabled={isFetching}
        onClick={async () => {
          router.refresh();
          setFetching(true);
          setTimeout(() => {
            setFetching(false);
          }, 2300)
        }}
      >
        {isFetching ? (
          <Loading size={24} color="var(--text2)" />
        ) : (
          <Refresh />
        )}
      </button>
    </div>
  );
};
