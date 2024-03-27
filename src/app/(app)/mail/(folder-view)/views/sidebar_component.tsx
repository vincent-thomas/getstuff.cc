"use client";

import { cn } from "@stuff/components/utils";
import type { ReactNode } from "react";
import { Link } from "src/components/structure/link";


export const SidebarLink = ({ children, href, className }: {children: ReactNode, href: string,className?:string}) => {
  
  return (
    <Link
      activeClass="outline bg-hover"
      className={cn("text-text hover:outline outline-1 outline-border flex items-center md:gap-2 rounded-md px-3 py-2 hover:bg-hover md:text-lg font-semibold flex-col md:flex-row", className)}
      href={href}
      prefetch
    >
      {children}
    </Link>
  )
}