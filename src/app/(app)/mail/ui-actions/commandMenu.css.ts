import { globalStyle, style } from "@vanilla-extract/css";
import { border } from "src/components/recipies";

export const DialogRoot = style([
  css({
    position: "fixed",
  }),
  {
    top: 0,
    margin: "auto",
    width: "500px",
    inset: "0.75rem",
    maxHeight: "80vh",
    marginTop: "10vh",
    height: "fit-content",
  },
]);

globalStyle("[data-backdrop]", {
  // backgroundColor: "hsl(204 4% 0% / 0.1)",
  // backdropFilter: "blur(0.5px)",
});

export const cardStyle = style([
  css({ bg: "bgSubtle", pX: "large", pY: "small" }),
  border({ rounded: "radius", side: "all", color: "interactive" }),
]);

export const cardRoot = style({
  backgroundColor: "rgba(0,0,0,0.8)",
  boxShadow: "0px 40px 24px 8px rgba(0,0,0,0.8)",
});

export const comboboxItem = style({
  outline: "none !important",
});

globalStyle(`${comboboxItem}[data-active-item]`, {
  backgroundColor: `${palette.bgSelected} !important`,
  outlineOffset: "0",
  outline: `1px solid ${palette.borderFocus} !important`,
});
