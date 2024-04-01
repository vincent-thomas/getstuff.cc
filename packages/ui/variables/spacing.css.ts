import { assignVars, createThemeContract, style } from "@vanilla-extract/css";


export const spacing = createThemeContract({
  small: null,
  medium: null,
  large: null,
  xlarge: null
});

export const spacingDefiningClass = style({
  vars: assignVars(spacing, {
    small: "4px",
    medium: "6px",
    large: "8px",
    xlarge: "10px"
  }),
  "@media": {
    "screen and (min-width: 768px)": {
      vars: assignVars(spacing, {
        small: "6px",
        medium: "8px",
        large: "12px",
        xlarge: "16px"
      })
    },
 
  }
})