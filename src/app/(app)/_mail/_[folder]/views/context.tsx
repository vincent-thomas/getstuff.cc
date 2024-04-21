"use client";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { api } from "@stuff/api-client/react";
import { vanillaApi } from "@stuff/api-client/vanilla";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const Provider = ({ children }: { children: ReactNode }) => {
  const utils = api.useUtils();

  return (
    <DndContext onDragEnd={handleDragEnd.bind(this, utils)}>
      {children}
    </DndContext>
  );
};

export const draggableDataInterface = z.union([
  z.object({
    type: z.enum(["mail-row"]),
    threadId: z.string(),
    folderId: z.string(),
  }),
  z.object({ type: z.enum(["something"]) }),
]);

export type DraggableData = z.infer<typeof draggableDataInterface>;

export const droppableDataInterface = z.union([
  z.object({ type: z.enum(["folder"]), folderId: z.string() }),
  z.object({ type: z.enum(["something"]) }),
]);

async function handleDragEnd(
  utils: ReturnType<typeof api.useUtils>,
  event: DragEndEvent,
) {
  const { over: droppableRAW, active: draggableRAW } = event;

  if (droppableRAW === null) {
    toast.error("Area is not droppable", {
      duration: 2000,
    });
    return;
  }

  const droppable = droppableDataInterface.parse(droppableRAW.data.current);

  const draggable = draggableDataInterface.parse(draggableRAW?.data.current);

  switch (draggable.type) {
    case "mail-row": {
      if (droppable.type !== "folder") {
        throw new Error("non supported droppable type");
      }

      if (droppable.folderId === draggable.folderId) {
        toast.error("Can't drop into same folder", {
          duration: 2000,
        });
        return;
      }

      // utils.mail.threads.getThreads.setData(
      //   { folderId: draggable.folderId },
      //   oldData => {
      //     return (oldData || []).filter(item => {
      //       return item.thread.threadId !== draggable.threadId;
      //     });
      //   },
      // );

      // await vanillaApi.mail.threads.moveThreads.mutate({
      //   folderId: draggable.folderId,
      //   threadIds: [draggable.threadId],
      //   newFolderId: droppable.folderId,
      // });
      // await utils.mail.threads.getThreads.invalidate({
      //   folderId: draggable.folderId,
      // });
      // await utils.mail.threads.getThreads.invalidate({
      //   folderId: droppable.folderId,
      // });
      return;
    }
    default:
      throw new Error(`Unhandled type: ${draggable?.type}`);
  }
}
