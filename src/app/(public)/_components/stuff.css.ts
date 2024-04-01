import { style } from "@vanilla-extract/css";
import { colors } from "packages/ui/theme";


export const brandingGradient = style({
  background: `linear-gradient(to right, ${colors.accent1}, ${colors.accent2})`,
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block"
})