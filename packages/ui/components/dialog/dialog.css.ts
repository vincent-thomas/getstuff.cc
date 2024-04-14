import { style } from "@vanilla-extract/css";
import { fadeEnter, fadeOut } from "packages/ui/keyframes/enter.css";

export const dialogContentStyles = style({
  selectors: {
    "&[data-state='open']": {
      animationName: fadeEnter,
      animationDuration: "200ms",
      animationTimingFunction: "ease",
    },
    "&[data-state='closed']": {
      animationName: fadeOut,
      animationDuration: "200ms",
      animationTimingFunction: "ease",
    },
  },
});
