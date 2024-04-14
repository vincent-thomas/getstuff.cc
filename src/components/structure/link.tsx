"use client";

import { Button } from "@stuff/ui/button";
import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, FC, ReactNode, Ref } from "react";
import { cn } from "../utils";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  NextLinkProps & {
    activeClass?: string;
    children?: ReactNode;
    ref?: Ref<HTMLAnchorElement>;
  };

export const Link: FC<LinkProps> = ({
  activeClass,
  className,
  style,
  ref,
  ...props
}) => {
  const pathname = usePathname();
  return (
    <Button
      render={
        <NextLink
          ref={ref}
          style={{ ...style, whiteSpace: "wrap" }}
          className={cn(pathname === props.href && activeClass, className)}
          {...props}
        />
      }
    />
  );
};
