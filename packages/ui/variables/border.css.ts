import { createThemeContract, styleVariants } from "@vanilla-extract/css";

export const rounding = styleVariants({
	icon: { borderRadius: "50%" },
	md: { borderRadius: "8px" },
	lg: { borderRadius: "12px" },
	xl: { borderRadius: "24px" },
	sm: { borderRadius: "4px" },
	none: { borderRadius: "0px" },
});
