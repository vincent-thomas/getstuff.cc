"use client"

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { ReactNode } from "react";
import { z } from "zod";

export const Provider = ({children}: {children: ReactNode}) => {
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  )
}

export const draggableDataInterface = z.object({
  type: z.enum(["mail-row"]),
  id: z.string()
})

export type DraggableData = z.infer<typeof draggableDataInterface>;

export const droppableDataInterface = z.any().optional();

async function handleDragEnd(event: DragEndEvent) {
  const {over: droppableRAW, active: draggableRAW} = event;

  if (droppableRAW === null) return;

  const draggable = draggableDataInterface.parse(draggableRAW?.data.current);

  switch (draggable.type) {
    case "mail-row":
      console.log('mail-row');
      return;
    default:
      throw new Error(`Unhandled type: ${draggable?.type}`);
  }
}