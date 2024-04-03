import { recipe } from "@vanilla-extract/recipes";

export const shadow = recipe({
	variants: {
		size: {
			small: {
				boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
			},
			medium: {
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
			},
			large: {
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
			},
		},
	},
});
