"use client";

import { useDroppable } from "@dnd-kit/core";
import { api } from "@stuff/api-client/react";
import type { api as apiServer } from "@stuff/api-client/server";
import { cn } from "@stuff/components/utils";
import { button } from "@stuff/ui/button";
import Link from "next/link";
import { useMemo } from "react";
import { isHoveringState } from "../views/sidebar_component.css";

export const Folder = ({
  folder,
}: {
  folder: Awaited<
    ReturnType<typeof apiServer.mail.folders.listFolders.query>
  >[number];
}) => {
  const utils = api.useUtils();
  const { setNodeRef, isOver, over, active } = useDroppable({
    id: folder.folderId,
    data: {
      type: "folder",
      folderId: folder.folderId,
    },
  });

  const canDrop = useMemo(() => {
    return over?.data.current?.folderId !== active?.data?.current?.folderId;
  }, [over, active]);

  const mouseOver = async () => {
    await utils.mail.threads.getThreads.prefetch(
      {
        folderId: folder.folderId,
      },
      {
        staleTime: 1000 * 2,
      },
    );
  };

  return (
    <div ref={setNodeRef} className={cn(isOver && canDrop && isHoveringState)}>
      <Link
        href={`./${folder.folderId}`}
        key={folder.folderId}
        className={cn(
          button({ variant: "ghost", size: "md", rounded: "medium" }),
        )}
        onMouseOver={mouseOver}
      >
        {folder.folderName}
      </Link>
    </div>
  );
};
