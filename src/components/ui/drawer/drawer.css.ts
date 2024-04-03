import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("[vaul-drawer][vaul-drawer-direction=bottom]::after", {
	height: "0 !important",
});

export const drawerOverlay = style({
	position: "fixed",
	inset: 0,
	zIndex: 50,
	background: "black",
	opacity: "0.80",
});

export const contentWrapper = style({
	top: 0,
	bottom: 0,
	insetInline: 0,
	zIndex: 50,
});
