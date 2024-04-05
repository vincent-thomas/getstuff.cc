import { style } from "@vanilla-extract/css";
import { palette } from "packages/ui/theme";

export const menuItem = style({
	selectors: {
		"&[data-focus-visible='true']": {
			outline: "2px solid " + palette.borderFocus,
		},
	},
});
