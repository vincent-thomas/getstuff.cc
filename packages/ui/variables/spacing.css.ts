import { assignVars, createThemeContract, style } from "@vanilla-extract/css";


export const spacing = createThemeContract({
  small: null,
  medium: null,
  large: null,
  xlarge: null,
  "2xlarge": null
});

export const spacingDefiningClass = style({
  vars: assignVars(spacing, {
    small: "6px",
    medium: "10px",
    large: "12px",
    xlarge: "24px",
    "2xlarge": "48px"
  }),
  "@media": {
    "screen and (min-width: 768px)": {
      vars: assignVars(spacing, {
        small: "8px",
        medium: "12px",
        large: "14px",
        xlarge: "28px",
        "2xlarge": "56px"
      })
    },
  }
})