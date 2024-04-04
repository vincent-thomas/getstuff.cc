import { style } from "@vanilla-extract/css";
import { palette } from "packages/ui/theme";
import { rounding } from "packages/ui/variables";

export const hoverUnderline = style([
	rounding.md,
	{
		backgroundColor: "transparent",
		color: palette.text1,
		outlineOffset: "-1px",
		":hover": {
			backgroundColor: palette.bgHover,
			outline: `${palette.borderComponent} solid 1px`,
		},
	},
]);
