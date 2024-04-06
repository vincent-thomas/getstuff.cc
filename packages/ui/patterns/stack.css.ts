import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { style } from "@vanilla-extract/css";
import { screenConditions } from "../conditions";
import { spacing } from "../variables";

const structureRecipe = defineProperties({
	...screenConditions,
	defaultCondition: "mobile",
	responsiveArray: ["mobile", "tablet", "desktop"],
	properties: {
		flexDirection: {
			row: "row",
			col: "column",
			"reverse-col": "column-reverse",
			"reverse-row": "row-reverse",
		},
		justifyContent: {
			center: "center",
			between: "space-between",
			start: "flex-start",
			end: "flex-end",
			unset: "unset",
		},
		alignItems: {
			center: "center",
			between: "space-between",
			start: "flex-start",
			end: "flex-end",
		},
		display: {
			1: "inline-flex !important",
		},
		flexGrow: {
			1: 1,
		},
		gap: {
			xs: {
				gap: spacing.xsmall,
			},
			sm: {
				gap: spacing.small,
			},
			md: {
				gap: spacing.medium,
			},
			lg: {
				gap: spacing.large,
			},
			xl: {
				gap: spacing.xlarge,
			},
		},
	},
	shorthands: {
		direction: ["flexDirection"],
		justify: ["justifyContent"],
		align: ["alignItems"],
		grow: ["flexGrow"],
		inline: ["display"],
	},
});

export const flexSprinkle = createSprinkles(structureRecipe);

export type FlexSprinkles = Parameters<typeof flexSprinkle>[0];

export const defaultFlex = style({ display: "flex" });
