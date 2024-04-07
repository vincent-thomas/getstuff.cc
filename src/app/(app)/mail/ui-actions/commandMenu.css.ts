import { globalStyle, style } from "@vanilla-extract/css";

export const DialogRoot = style([
	css({
		position: "fixed",
	}),
	{
		top: 0,
		margin: "auto",
		width: "500px",
		inset: "0.75rem",
		maxHeight: "80vh",
		marginTop: "10vh",
		height: "fit-content",
	},
]);

globalStyle("[data-backdrop]", {
  backgroundColor: "hsl(204 4% 0% / 0.1)",
	backdropFilter: "blur(4px)"
})

export const focusClass = style({
	backgroundColor: `${palette.bgSelected} !important`,
})