"use client";

import { useDroppable } from "@dnd-kit/core";
import { cn } from "@stuff/components/utils";
import type { ReactNode } from "react";
import { border } from "src/components/recipies";
import { Link } from "src/components/structure/link";
import { isHoveringState, sidebarLinkActive } from "./sidebar_component.css";

export const SidebarLink = ({
  children,
  folderId,
  className,
  disableDroppable,
}: {
  children: ReactNode;
  folderId: string;
  className?: string;
  disableDroppable?: boolean;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: folderId,
    data: {
      type: "folder",
      folderId: folderId,
    },
  });
  return (
    <Link
      ref={disableDroppable ? undefined : setNodeRef}
      activeClass={sidebarLinkActive}
      className={cn(
        isOver && isHoveringState,
        stack({ align: "center", gap: "sm", justify: "start" }),
        border({ rounded: "radius" }),
        css({ bg: { hover: "bgHover" }, p: "medium", color: "text2" }),
        className,
      )}
      href={`/mail/${folderId}`}
      prefetch
    >
      {children}
    </Link>
  );
};
