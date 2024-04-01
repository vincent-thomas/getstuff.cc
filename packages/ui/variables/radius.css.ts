import { styleVariants } from "@vanilla-extract/css";

export const rounding = styleVariants({
  "icon": { borderRadius: "50%" },
  "md": { borderRadius: "8px" },
  "sm": { borderRadius: "4px" },
  "none": { borderRadius: "0px" }
})