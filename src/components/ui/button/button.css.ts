import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { colors, themeMode } from "packages/ui/theme";
import { rounding, spacing } from "packages/ui/variables";
import { border, stack } from "src/components/recipies";
;

export const button = recipe({
  base: [
    stack({direction: "row", align: "center", justify: "center", gap: "sm", inline: 1}),
    style({
      whiteSpace: "nowrap",
      fontWeight: 600,
      transition: "colors",
      cursor: "pointer",
      outline: "none",
      ":disabled": {
        pointerEvents: "none",
        opacity: 0.5,
        cursor: "not-allowed"
      },
    })
  ],
  variants: {
    variant: {
      primary: {
        background: themeMode.text1,
        color: themeMode.background1,
      },
      outline: [
        border({ thickness: "normal" }),
        style({
          ":hover": {
            background: themeMode.hover,
            color: themeMode.text2
          }
        })
      ],
      accent: {
        background: colors.accent1,
        color: colors.accentForeground,
        ":hover": {
          background: colors.accent2,
        },
      },
      ghost: {
        ":hover": {
          background: themeMode.hover,
          color: themeMode.text2
        },
        color: themeMode.text1
      },
      link: {
        color: themeMode.text1,
        textUnderlineOffset: "4px",
        ":hover": {
          textDecoration: "underline",
        }
      },
    },
    size: {
      sm: {padding: spacing.small},
      md: {padding: spacing.medium},
      lg: {padding: spacing.large},
      icon: css({p: "medium"})
    },
    rounded: {
      medium: rounding.md,
      icon: {
        borderRadius: "50%",
      },
    }
  },
})

export type ButtonVariants = RecipeVariants<typeof button>;