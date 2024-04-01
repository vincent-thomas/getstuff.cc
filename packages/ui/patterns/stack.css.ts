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
      "reverse-col": "column-reverse",
      "reverse-row": "row-reverse"
    },
    justifyContent: {
      center: "center", 
      between: "space-between",
      start: "flex-start",
      end: "flex-end"
    },
    alignItems:{
      center: "center", 
      between: "space-between",
      start: "flex-start",
      end: "flex-end"
    },
    flexGrow: {
      1: 1
    },
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
    grow: ["flexGrow"],
  }
})

export const flexSprinkle = createSprinkles(structureRecipe);

export type FlexSprinkles = Parameters<typeof flexSprinkle>[0];

export const defaultFlex = style({display: "flex"});