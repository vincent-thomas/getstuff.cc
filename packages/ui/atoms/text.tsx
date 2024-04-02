import { FC, HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {}

export const Text1: FC<TextProps> = ({ children, className, ...other }) => (
	<span className={cn(css({ color: "text1" }), className)} {...other}>
		{children}
	</span>
);

export const Text2: FC<TextProps> = ({ children, className, ...other }) => (
	<span className={cn(css({ color: "text2" }), className)} {...other}>
		{children}
	</span>
);
