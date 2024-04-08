import { style } from "@vanilla-extract/css";

export const brandingGradient = style({
	background: `linear-gradient(to right, ${palette.solid1}, ${palette.solid2})`,
	backgroundClip: "text",
	WebkitTextFillColor: "transparent",
	display: "inline-block",
});
