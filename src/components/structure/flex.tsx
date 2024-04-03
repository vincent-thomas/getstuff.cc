import type { FC, ReactNode } from "react";
import { cn } from "../../../packages/components/utils";

interface Props {
	col?: true;
	children: ReactNode;
	gap?: `${string}${"px" | "rem"}`;
	className?: string;
	justify?: "start" | "end" | "center" | "between";
	align?: "start" | "end" | "center" | "between";
}

export const Flex: FC<Props> = ({
	col = false,
	children,
	gap,
	className,
	justify,
	align,
}) => (
	<div
		className={cn(
			"flex",
			!!col && "flex-col",
			justify && `justify-${justify}`,
			align && `items-${align}`,
			className,
		)}
		style={gap && { gap }}
	>
		{children}
	</div>
);
