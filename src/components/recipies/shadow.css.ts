import { recipe } from "@vanilla-extract/recipes";

export const shadow = recipe({
	variants: {
		size: {
			small: {
				boxShadow: "0 1px 2px rgba(0, 0, 0, 0.9)",
			},
			medium: {
				boxShadow:
					"0 0 0 1px rgb(255 255 255/0.15),0 25px 50px -12px rgb(0 0 0/0.35)",
			},
			large: {
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.9)",
			},
		},
	},
});
