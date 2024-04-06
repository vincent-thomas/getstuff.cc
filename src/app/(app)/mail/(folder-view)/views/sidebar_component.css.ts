import { style } from "@vanilla-extract/css";

export const sidebarLinkActive = style({
	outline: `1px solid ${palette.borderComponent}  !important`,
	backgroundColor: palette.bgSelected,
});
