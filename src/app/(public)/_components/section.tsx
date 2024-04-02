import { cn } from "packages/components/utils";
import type { ReactNode } from "react";

const width = {
	xs: "600px",
	sm: "1000px",
	md: "1200px",
	lg: "1400px",
	xl: "1600px",
	custom: "none",
};

export const Section = ({
	children,
	className,
	maxWidth = "custom",
	style,
}: {
	children: ReactNode;
	className?: string;
	maxWidth?: keyof typeof width;
	style?: React.CSSProperties;
}) => {
	return (
		<section
			style={{
				...style,
				maxWidth: width[maxWidth],
				width: "100%",
			}}
			className={cn(css({ mX: "auto", pX: "small" }), className)}
		>
			{children}
		</section>
	);
};
