import type { CSSProperties, ReactNode } from "react";
import { cn } from "../utils";

export const P = ({
	children,
	className,
	style,
}: { children?: ReactNode; className?: string; style?: CSSProperties }) => {
	return (
		<p style={style} className={cn(css({ color: "text2" }), className)}>
			{children}
		</p>
	);
};
