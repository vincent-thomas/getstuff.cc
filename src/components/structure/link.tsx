"use client";

import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils";

export type LinkProps = HTMLAttributes<HTMLAnchorElement> &
	NextLinkProps & {
		activeClass?: string;
		children?: ReactNode;
	};

export const Link: FC<LinkProps> = ({ activeClass, className, ...props }) => {
	const pathname = usePathname();
	return (
		<NextLink
			className={cn(pathname === props.href && activeClass, className)}
			{...props}
		/>
	);
};
