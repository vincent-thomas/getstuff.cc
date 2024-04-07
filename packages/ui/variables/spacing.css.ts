import {
	assignVars,
	createThemeContract,
	globalStyle,
	style,
} from "@vanilla-extract/css";

export const spacing = createThemeContract({
	xsmall: null,
	small: null,
	medium: null,
	large: null,
	xlarge: null,
	"2xlarge": null,
});

export const spacingDefiningClass = style({
	vars: assignVars(spacing, {
		xsmall: "4px",
		small: "6px",
		medium: "10px",
		large: "16px",
		xlarge: "24px",
		"2xlarge": "48px",
	}),
	"@media": {
		"screen and (min-width: 768px)": {
			vars: assignVars(spacing, {
				xsmall: "6px",
				small: "8px",
				medium: "12px",
				large: "18px",
				xlarge: "28px",
				"2xlarge": "52px",
			}),
		},
	},
});
