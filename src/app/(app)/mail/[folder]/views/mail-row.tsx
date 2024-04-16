"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@stuff/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useAtom } from "jotai";
import { GripVerticalIcon } from "lucide-react";
import { Checked, UnChecked } from "packages/icons/lib/unchecked";
import { Text1, Text2 } from "packages/ui/atoms";
import { border, shadow, stack } from "src/components/recipies";
import { Link } from "src/components/structure/link";
import { messagesIdSelected } from "../store/messages-id-selected";
import { type DraggableData, draggableDataInterface } from "./context";

export const MailRow = ({
  thread,
  folderId,
}: {
  folderId: string;
  thread: {
    threadId: string;
    read: boolean;
    title: string;
    lastActive: number;
  };
}) => {
  const [selected, setSelected] = useAtom(messagesIdSelected);
  const {
    setNodeRef,
    listeners,
    setActivatorNodeRef,
    transform,
    attributes,
    isDragging,
  } = useDraggable({
    id: `mail-row:${thread.threadId}`,
    data: draggableDataInterface.parse({
      type: "mail-row",
      threadId: thread.threadId,
      folderId,
    } as DraggableData),
  });

  return (
    <div
      ref={setNodeRef}
      key={thread.threadId}
      style={{
        position: isDragging ? "fixed" : "relative",
        zIndex: isDragging ? 100 : 0,
        transform: CSS.Translate.toString(transform),
      }}
      {...attributes}
      className={cn(
        stack({}),
        css({
          bg: {
            default: selected.includes(thread.threadId)
              ? "highlight"
              : thread.read
                ? "bgComponent"
                : "bgApp",
          },
        }),
        isDragging &&
          shadow({
            size: "large",
          }),
        border({
          side: "b",
          color: isDragging ? "focus" : "interactive",
          rounded: isDragging ? "lg" : undefined,
        }),
      )}
    >
      <button
        ref={setActivatorNodeRef}
        className={cn(
          css({ p: "medium", paddingRight: "none" }),
          stack({ justify: "center", align: "center" }),
        )}
        {...listeners}
      >
        <GripVerticalIcon size={18} color={palette.text1} />
      </button>

      <div className={css({ pY: "small", marginRight: "small" })}>
        <Button
          variant="icon"
          size="md"
          className={cn(css({ bg: { hover: "bgHover" } }))}
          onClick={() => {
            if (selected.includes(thread.threadId)) {
              setSelected(selected.filter(id => id !== thread.threadId));
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
        </Button>
      </div>
      <Link
        href={`/mail/${folderId}/${thread.threadId}`}
        key={thread.threadId}
        className={cn(
          stack({ grow: 1, align: "center", gap: "lg" }),
          css({ pY: "small", paddingRight: "large", textAlign: "left" }),
        )}
      >
        <p
          style={{ width: "300px" }}
          className={cn(
            css({
              fontWeight: thread.read ? "normal" : "semibold",
              color: thread.read ? "text2" : "text1",
            }),
            thread.read ? "text-text2" : "font-semibold",
          )}
        >
          {thread.title}
        </p>
        <Text2 className={cn(css({ marginLeft: "auto" }))}>
          {formatDistanceToNow(new Date(thread.lastActive), {
            addSuffix: true,
          })}
        </Text2>
        <Text1 style={{ width: "4rem", textAlign: "end" }}>
          <i>{thread.read ? "read" : "not read"}</i>
        </Text1>
      </Link>
    </div>
  );
};
