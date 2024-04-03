import type { FC, HTMLAttributes } from "react";
import { cn } from "../utils";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	weight: "bold" | "normal" | "semibold";
}

export const Heading: FC<HeadingProps> = ({
	className,
	weight,
	style,
	...props
}) => (
	<h1
		{...props}
		style={{ ...style, fontWeight: weight }}
		className={cn(`tracking-tight`, css({ color: "text1" }), className)}
	/>
);
