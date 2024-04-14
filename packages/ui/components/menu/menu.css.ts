import { style } from "@vanilla-extract/css";

export const menuItem = style({
  selectors: {
    "&[data-focus-visible='true']": {
      outline: "2px solid " + palette.borderFocus,
      outlineOffset: "2px",
    },
  },
});

export const menuItemStyle = style({
  borderRadius: "8px",
  cursor: "pointer",
  color: palette.text2,
});
