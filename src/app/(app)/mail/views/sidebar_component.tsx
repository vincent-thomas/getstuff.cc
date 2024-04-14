"use client";

import { cn } from "@stuff/components/utils";
import type { ReactNode } from "react";
import { border } from "src/components/recipies";
import { Link } from "src/components/structure/link";
import { sidebarLinkActive } from "./sidebar_component.css";

export const SidebarLink = ({
  children,
  href,
  className,
}: { children: ReactNode; href: string; className?: string }) => {
  return (
    <Link
      activeClass={sidebarLinkActive}
      className={cn(
        stack({ align: "center", gap: "sm", justify: "start" }),
        border({ rounded: "radius" }),
        css({ bg: { hover: "bgHover" }, p: "medium", color: "text2" }),
        className,
      )}
      href={href}
      prefetch
    >
      {children}
    </Link>
  );
};
