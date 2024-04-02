import { style } from "@vanilla-extract/css";
import { colors } from "packages/ui/theme";

export const marker = style({
	"::marker": {
		color: colors.accent1,
	},
});
