import { style } from "@vanilla-extract/css";

export const sidebarLinkActive = style({
  outline: `1px solid ${palette.borderComponent}  !important`,
  backgroundColor: palette.bgSelected,
});


export const isHoveringState = style({
  outline: `3px solid ${palette.solid1}  !important`,
  outlineOffset: "3px"
})