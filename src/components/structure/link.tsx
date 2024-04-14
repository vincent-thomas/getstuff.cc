"use client";

import { Button } from "@stuff/ui/button";
import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, FC, ReactNode } from "react";
import { cn } from "../utils";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  NextLinkProps & {
    activeClass?: string;
    children?: ReactNode;
  };

export const Link: FC<LinkProps> = ({
  activeClass,
  className,
  style,
  ...props
}) => {
  const pathname = usePathname();
  return (
    <Button
      render={
        <NextLink
          style={{ ...style, whiteSpace: "wrap" }}
          className={cn(pathname === props.href && activeClass, className)}
          {...props}
        />
      }
    />
  );
};
