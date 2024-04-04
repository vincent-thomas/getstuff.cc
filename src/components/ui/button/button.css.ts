import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { palette } from "packages/ui/theme/palettes.css";
import { rounding, spacing } from "packages/ui/variables";
import { border, stack } from "src/components/recipies";

export const button = recipe({
	base: [
		stack({
			direction: "row",
			align: "center",
			justify: "center",
			gap: "sm",
			inline: 1,
		}),
		style({
			whiteSpace: "nowrap",
			fontWeight: 600,
			transition: "colors",
			cursor: "pointer",
			outline: "none",
			":disabled": {
				pointerEvents: "none",
				opacity: 0.5,
				cursor: "not-allowed",
			},
		}),
	],
	variants: {
		variant: {
			primary: {
				background: palette.text2,
				color: palette.background1,
			},
			outline: [
				border({ color: "interactive" }),
				style({
					":hover": {
						background: palette.bgHover,
						color: palette.text2,
					},
					color: palette.text2,
				}),
			],
			accent: [
				border({ color: "interactive" }),
				{
					background: palette.solid1,
					color: "white",
					":hover": {
						background: palette.solid2,
					},
				},
			],
			ghost: {
				":hover": {
					background: palette.bgHover,
					color: palette.text2,
				},
				color: palette.text2,
			},
			link: {
				color: palette.text2,
				textUnderlineOffset: "4px",
				":hover": {
					textDecoration: "underline",
				},
			},
		},
		size: {
			sm: { padding: spacing.small },
			md: { padding: spacing.medium },
			lg: { padding: spacing.large },
			icon: css({ p: "medium" }),
		},
		rounded: {
			medium: rounding.md,
			icon: {
				borderRadius: "50%",
			},
		},
	},
});

export type ButtonVariants = RecipeVariants<typeof button>;
