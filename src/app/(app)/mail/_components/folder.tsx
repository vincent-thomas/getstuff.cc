"use client";

import { useDroppable } from "@dnd-kit/core";
import { api } from "@stuff/api-client/react";
import type { api as apiServer } from "@stuff/api-client/server";
import { cn } from "@stuff/components/utils";
import { button } from "@stuff/ui/button";
import Link from "next/link";
import { z } from "zod";

export const Folder = ({
  folder,
}: {
  folder: Awaited<
    ReturnType<typeof apiServer.mail.folders.listFolders.query>
  >[number];
}) => {
  const utils = api.useUtils();
  const { setNodeRef } = useDroppable({
    id: folder.sk,
    data: {
      type: "folder",
      folderId: folder.sk.split("|")[1],
    },
  });

  const mouseOver = async () => {
    await utils.mail.threads.getThreads.prefetch(
      {
        folderId: z.string().parse(folder.sk.split("|")[1]),
      },
      {
        staleTime: 1000 * 10,
      },
    );
  };

  return (
    <div ref={setNodeRef}>
      <Link
        href={`./${folder.sk.split("|")[1]}`}
        key={folder.sk.split("|")[1]}
        className={cn(
          button({ variant: "ghost", size: "md", rounded: "medium" }),
        )}
        onMouseOver={mouseOver}
      >
        {folder.gsi2.split("|")[2]}
      </Link>
    </div>
  );
};
