import { recipe } from "@vanilla-extract/recipes";
import { themeMode } from "packages/ui/theme";
import { rounding } from "packages/ui/variables";


export const border = recipe({
  base: {
    border: `1px solid ${themeMode.border}`
  },
  variants: {
    thickness: {
      normal: {
        borderWidth: "1px"
      },
      thick: {
        borderWidth: "2px"
      }
    },
    rounded: {
      radius: rounding.md,
      lg: rounding.lg,
      xl: rounding.xl,
      circle: {
        borderRadius: "50%"
      }
    }
  },
  defaultVariants: {
    thickness: "normal"
  }
})