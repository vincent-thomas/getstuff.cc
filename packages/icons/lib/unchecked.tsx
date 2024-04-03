export const UnChecked = ({
	className,
	size,
}: {
	className?: string;
	innerClassName?: string;
	size: number;
}) => {
	return (
		<svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="2"
				y="2"
				width="28"
				height="28"
				rx="4"
				className={css({ stroke: "text2", fill: "transparent" })}
				strokeWidth="4"
			/>
		</svg>
	);
};

export const Checked = ({
	className,
	size,
}: {
	className?: string;
	size: number;
}) => {
	return (
		<svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 33 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="2.08594"
				y="2"
				width="28"
				height="28"
				className={css({ fill: "text2", stroke: "text2" })}
				rx="4"
				strokeWidth="4"
			/>
			<rect
				x="4"
				y="16.2681"
				width="4.62136"
				height="13.6664"
				rx="2"
				transform="rotate(-45 4 16.2681)"
				className={css({ fill: "bgApp" })}
			/>
			<rect
				x="25.2285"
				y="8"
				width="4.5"
				height="20.8576"
				rx="2"
				transform="rotate(45 25.2285 8)"
				className={css({ fill: "bgApp" })}
			/>
		</svg>
	);
};
