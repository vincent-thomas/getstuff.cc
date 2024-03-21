"use client";

import { useState } from "react";
import { Refresh } from "../icons/refresh";
import { Loading } from "packages/icons";
import { useRouter } from "next/navigation";

export const RefreshButton = ({ folderId }: { folderId: string }) => {
  const [isFetching, setFetching] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <button
      className="hover:bg-muted rounded-full p-2"
        disabled={isFetching}
        onClick={async () => {
          setFetching(true);
          // revalidatePath(`/mail/${folderId}`);
          router.refresh()
          // // await refetch();
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
