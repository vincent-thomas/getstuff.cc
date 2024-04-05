import { style } from "@vanilla-extract/css";
import { palette } from "packages/ui/theme";

export const menuButton = style({
	outline: `1px solid ${palette.borderComponent}`,
	backgroundColor: palette.bgComponent,
});
