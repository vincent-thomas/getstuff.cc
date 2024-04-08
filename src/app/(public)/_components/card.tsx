import type { spacing } from "packages/ui/variables";
import type { HTMLAttributes, ReactNode } from "react";
import { border } from "src/components/recipies";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	p?: keyof typeof spacing;
	children?: ReactNode;
}

export function Card({
	className,
	p,
	...props
}: CardProps & {
	className?: string;
}) {
	return (
		<div
			className={cn(
				border({ rounded: "lg" }),
				css({
					overflow: "hidden",
					padding: p ?? "none",
				}),
				className,
			)}
			{...props}
		/>
	);
}
