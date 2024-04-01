import { recipe } from "@vanilla-extract/recipes";
import { themeMode } from "packages/ui/theme";
import { borderRadius } from "src/styles/themes.css";


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
      radius: {
        borderRadius: borderRadius
      },
      circle: {
        borderRadius: "50%"
      }
    }
  },
  defaultVariants: {
    thickness: "normal"
  }
})