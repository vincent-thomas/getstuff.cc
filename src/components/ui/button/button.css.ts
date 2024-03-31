import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { border, stack } from "src/components/recipies";
import { css } from "src/components/styler.css";
import { borderRadius, theme } from "src/styles/themes.css";

export const button = recipe({
  base: [
    stack({direction: "row", align: "center", justify: "center", gap: "sm"}),
    style({
      whiteSpace: "nowrap",
      fontWeight: "medium",
      transition: "colors",
      cursor: "pointer",
      outline: "none",
      ":disabled": {
        pointerEvents: "none",
        opacity: 0.5,
      },
    })
  ],
  variants: {
    variant: {
      primary: {
        background: theme.text,
        color: theme.background,
      },
      outline: [
        border({ thickness: "normal" }),
        style({
          ":hover": {
            background: theme.hover,
            color: theme.text2
          }
        })
      ],
      accent: {
        background: theme.accent,
        color: "text.1",
        ":hover": {
          background: theme.accent2,
        },
      },
      // secondary: {
      //   bg: "secondary",
      //   color: "text.1",
      //   "&:hover": {
      //     bg: "secondary/80",
      //   },
      // },
      ghost: {
        ":hover": {
          background: theme.hover,
          color: theme.text2
        },
        color: theme.text
      },
      link: {
        color: "text.1",
        textUnderlineOffset: "[4px]",
        ":hover": {
          textDecoration: "underline",
        }
      },
    },
    size: {
      sm: css({ pY: "small", pX: "small" }),
      md: css({ pY: "small", pX: "medium" }),
      lg: css({ pY: "medium", pX: "large" }),
    },
    rounded: {
      medium: {
        borderRadius: borderRadius
      },
    }
  },
})

export type ButtonVariants = RecipeVariants<typeof button>;


// export const buttonVariants = cva(
//   css({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     whiteSpace: "nowrap",
//     rounded: "radius",
//     fontWeight: "medium",
//     transition: "colors",
//     gap: "2",
//     outline: "none", "&:disabled": {
//       pointerEvents: "none",
//       opacity: 0.75,
//     }
//   }),
//   {
//     variants: {
//       variant: {
//         primary: css({bg: "text", color: "background.1", "&:hover": {bg: "text.1"}}),
//         destructive:
//           "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//         outline:
//           cn(css({border: "border", borderWidth: "1px", bg: "background.1", "&:hover": {bg: "hover", color: "text.2"}})),
//           accent: css({
//             bg: "accent.1",
//             color: "text.1",
//             "&:hover": {
//               bg: "accent.2"
//             }
//           }),
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         ghost: cn(css({"&:hover": {bg: "hover"}}),"hover:text-text2"),
//         link: "text-text underline-offset-4 hover:underline",
//         icon: "hover:bg-hover bg-transparent text-text rounded-full",
//         none: ""
//       },
//       size: {
//         md: "px-4 py-2",
//         sm: "py-1.5 px-3",
//         xs: "py-1.5 px-2",
//         lg: "px-5 py-3",
//         icon: "p-3"
//       }
//     },
//     defaultVariants: {
//       size: "md",
//       variant: "primary"
//     }
//   }
// );
