import { style } from "@vanilla-extract/css";
import { spacing } from "packages/ui/variables";

export const menuItem = style({
	selectors: {
		"&[data-focus-visible='true']": {
			outline: "2px solid " + palette.borderFocus,
		},
	},
});

export const menuItemStyle = style({
	":hover": {
		backgroundColor: palette.bgHover,
		outline: `1px solid ${palette.borderComponent}`,
	},
	borderRadius: "8px",
	cursor: "pointer",
	padding: spacing.small,
	color: palette.text2,
});
