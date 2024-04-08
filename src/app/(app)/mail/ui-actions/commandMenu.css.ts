import { globalStyle, style } from "@vanilla-extract/css";
import { border } from "src/components/recipies";

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
	backdropFilter: "blur(4px)",
});

export const cardStyle = style([
	css({ bg: "bgSubtle", pX: "large", pY: "small" }),
	border({ rounded: "radius", side: "all", color: "interactive" }),
	{
		backdropFilter: "blur(100px)",
	},
]);

export const comboboxItem = style({
	outline: "none !important",
});

globalStyle(`${comboboxItem}[data-active-item][data-should-active='true']`, {
	backgroundColor: `${palette.bgSelected} !important`,
	outlineOffset: "0",
	outline: `1px solid ${palette.borderFocus} !important`,
});
