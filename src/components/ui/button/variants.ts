import { cva } from "@stuff/styling/css";

export const buttonVariants = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    rounded: "radius",
    fontWeight: "medium",
    transition: "colors",
    outline: "none",
    gap: "md",
    "&:disabled": {
      pointerEvents: "none",
      opacity: 0.5,
    },
    cursor: "pointer"
  },
  variants: {
    variant: {
      primary: {
        bg: "text.1",
        color: "background.1",
      },
      outline: {
        borderColor: "border",
        borderWidth: "border",
        borderStyle: "border",
        "&:hover": {
          bg: "hover",
          color: "text.2"
        }
      },
      accent: {
        bg: "accent.1",
        color: "text.1",
        "&:hover": {
          bg: "accent.1/80",
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
        "&:hover": {
          bg: "hover",
          color: "text.2"
        },
        color: "text.1",
      },
      link: {
        color: "text.1",
        textUnderlineOffset: "4px",
        "&:hover": {
          textDecoration: "underline",
        }
      },
    },
    size: {
      sm: {
        p: "sm"
      },
      md: {
        p: "md"
      },
      lg: {
        p: "lg"
      },
    }
  },
})


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
