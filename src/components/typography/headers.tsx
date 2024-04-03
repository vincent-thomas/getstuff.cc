import type { CSSProperties, ReactNode } from "react";
import { cn } from "../utils";
import { shared } from "./headers.css";

export const H1 = ({
	children,
	className,
	id,
	style,
}: {
	children?: ReactNode;
	className?: string;
	id?: string;
	style?: CSSProperties;
}) => {
	return (
		<h1
			style={style}
			id={id}
			className={cn(
				css({ fontWeight: "bold", color: "text1" }),
				shared,
				"text-4xl",
				className,
			)}
		>
			{children}
		</h1>
	);
};

export const H2 = ({
	children,
	className,
	...props
}: { children?: ReactNode; className?: string; id?: string }) => {
	return (
		<h2
			{...props}
			className={cn(
				css({ fontWeight: "bold", color: "text1" }),
				shared,
				"text-3xl",
				className,
			)}
		>
			{children}
		</h2>
	);
};

export const H3 = ({
	children,
	className,
}: { children?: ReactNode; className?: string }) => {
	return (
		<h2 className={cn(css({ fontWeight: "bold" }), "text-xl", className)}>
			{children}
		</h2>
	);
};

export const H4 = ({ children }: { children: ReactNode }) => {
	return <h2 className="text-lg font-bold">{children}</h2>;
};
