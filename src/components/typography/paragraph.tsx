import type { CSSProperties, ReactNode } from "react";
import { cn } from "../utils";

export const P = ({
	children,
	className,
	style,
}: { children?: ReactNode; className?: string; style?: CSSProperties }) => {
	return (
		<p style={style} className={cn(css({ color: "text1" }), className)}>
			{children}
		</p>
	);
};
