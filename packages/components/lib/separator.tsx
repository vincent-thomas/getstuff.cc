"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../utils";
import type { FC, HTMLAttributes } from "react";

const Separator: FC<
	HTMLAttributes<HTMLDivElement> & { orientation: "horizontal" | "vertical" }
> = ({ className, orientation = "horizontal", ...props }) => (
	<div
		className={cn(
			orientation === "horizontal"
				? "w-full border-t border-border"
				: "h-full border-l border-border",
			className,
		)}
		{...props}
	/>
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
