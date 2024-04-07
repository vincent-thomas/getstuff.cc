"use client";

import { cn } from "@stuff/components/utils";
import type { ReactNode } from "react";
import { Link } from "src/components/structure/link";
import { sidebarLinkActive } from "./sidebar_component.css";
import { border } from "src/components/recipies";

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
				// "hover:bg-hover md:text-lg font-semibold flex-col md:flex-row",
				className,
			)}
			href={href}
			prefetch
		>
			{children}
		</Link>
	);
};
