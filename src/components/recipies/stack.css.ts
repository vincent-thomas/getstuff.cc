import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { style } from "@vanilla-extract/css";

const structureRecipe = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 678px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  responsiveArray: ["mobile", "tablet", "desktop"],
  properties: {
    flexDirection: {
      row: "row",
      col: "column",
    },
    justifyContent: {
      center: "center", 
      between: "space-between",
      start: "flex-start",
      end: "flex-end"
    },
    alignItems: ["center", "flex-start", "flex-end"],
    gap: {
      xs: {
        gap: "4px"
      },
      sm: {
        gap: "6px"
      },
      md: {
        gap: "10px"
      },
      lg: {
        gap: "14px"
      },
      xl: {
        gap: "16px"
      }
    },
  },
  shorthands: {
    direction: ["flexDirection"],
    justify: ["justifyContent"],
    align: ["alignItems"],
  }
})

export const flexSprinkle = createSprinkles(structureRecipe);

export type FlexSprinkles = Parameters<typeof flexSprinkle>[0];

export const defaultFlex = style({display: "flex"});


// export const stackRecipe = recipe({
//   base: {
//     display: "flex",
//   },
//   variants: {
//     inline: {
//       1: {
//         display: "inline-flex"
//       }
//     },
//     dir: {
//       horizontal: {
//         flexDirection: "row",
//       },
//       vertical: {
//         flexDirection: "column",
//       },
//     },
//     align: alignings("alignItems"),
//     justify: alignings("justifyContent"),
//     space: {
//       xs: {
//         gap: "4px"
//       },
//       sm: {
//         gap: "6px"
//       },
//       md: {
//         gap: "10px"
//       },
//       lg: {
//         gap: "14px"
//       },
//       xl: {
//         gap: "16px"
//       }
//     }
//   },
//   defaultVariants: {
//     dir: "vertical"
//   }
// })