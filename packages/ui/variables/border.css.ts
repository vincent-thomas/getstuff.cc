import { createTheme } from "@vanilla-extract/css";

export const [roundingClass, rounding] = createTheme({
  none: "0px",
  small: "4px",
  medium: "8px",
  large: "12px",
  xlarge: "24px",
  "2xlarge": "32px",
  icon: "50%",
});
