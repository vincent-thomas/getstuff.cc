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
		css({
			fontWeight: "semibold",
			cursor: "pointer",
		}),
		style({
			whiteSpace: "nowrap",
			transition: "colors",
			outline: "none",
			borderRadius: "8px",
			":disabled": {
				pointerEvents: "none",
				opacity: 0.5,
				cursor: "not-allowed",
			},
			selectors: {
				"&[data-focus-visible]": {
					outline: "2px solid currentColor",
					outlineOffset: "4px",
				},
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
					color: palette.background1,
					":hover": {
						background: palette.solid2,
					},
					selectors: {
						"&[data-focus-visible]": {
							outlineColor: palette.solid1,
						},
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
			icon: [
				border({ rounded: "circle" }),
				{
					":hover": {
						background: palette.bgHover,
						color: palette.text2,
					},
					color: palette.text2,
				},
			],
		},
		size: {
			sm: { padding: spacing.small },
			md: { padding: spacing.medium },
			lg: { padding: spacing.large },
		},
		rounded: {
			medium: rounding.md,
		},
	},
});

export type ButtonVariants = RecipeVariants<typeof button>;
