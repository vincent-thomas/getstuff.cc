import { recipe } from "@vanilla-extract/recipes";
import { themeMode } from "packages/ui/theme";
import { rounding } from "packages/ui/variables";

export const border = recipe({
	base: {
		borderWidth: "1px",
		borderStyle: "solid",
	},
	variants: {
		color: {
			subtle: {
				borderColor: themeMode.borderSubtle,
			},
			interactive: {
				borderColor: themeMode.borderInteractive,
			},
			focus: {
				borderColor: themeMode.borderFocus,
			},
		},
		rounded: {
			radius: rounding.md,
			lg: rounding.lg,
			xl: rounding.xl,
			circle: {
				borderRadius: "50%",
			},
		},
	},
	defaultVariants: {
		color: "subtle",
	},
});
