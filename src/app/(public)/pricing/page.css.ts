import { style } from "@vanilla-extract/css";
import { palette } from "packages/ui/theme";

export const marker = style({
	"::marker": {
		color: palette.solid1,
	},
});
