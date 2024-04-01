import {createSprinkles, defineProperties} from "@vanilla-extract/sprinkles"
import { colors, themeMode } from "packages/ui/theme";
import { theme } from "src/styles/themes.css";
import {screenConditions} from "packages/ui/conditions"
import { spacing } from "packages/ui/variables";

const size = defineProperties({
  properties: {
    height: {
      screen: "100vh",
      full: "100%",
    },
    width: {
      screen: "100vw",
      full: "100%"
    },
    minWidth: {
      screen: "100vh",
      full: "100%"
    },
    minHeight: {
      screen: "100vh",
      full: '100%'
    }
  },
})

const space = {
  none: 0,
  small: spacing.small,
  medium: spacing.medium,
  large: spacing.large,
  xlarge: spacing.xlarge,
  "2xlarge": spacing["2xlarge"],
  auto: "auto"
}

const padding = defineProperties({
  properties: {
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space
  },
  shorthands: {
    p: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    padding: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    pX: ["paddingLeft", "paddingRight"],
    pY: ["paddingTop", "paddingBottom"]
  }
})

const margin = defineProperties({
  properties: {
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space
  },
  shorthands: {
    m: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
    margin: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
    mX: ["marginLeft", "marginRight"],
    mY: ["marginTop", "marginBottom"]
  }
})

export const anotherColors = {
  text1: themeMode.text1,
  text2: themeMode.text2,
  hover: theme.hover,
  bg: themeMode.background1,
  bg2: themeMode.background2,
  accent: colors.accent1,
  accent2: colors.accent2,
  highlight: theme.highlight,
  transparent: "transparent",
}

export const color = defineProperties({
  properties: {
    color: anotherColors,
    background: anotherColors,
    borderColor: {
      border: theme.border,
    },
    fill: anotherColors,
    stroke: anotherColors,
  },
  shorthands: {
    bg: ["background"],
  }
})

const multi = 1.2;
const base = 18;


export const fonts = defineProperties({
  ...screenConditions,
  properties: {
    fontWeight: {
      light: "400",
      normal: "normal",
      semibold: "600",
      bold: "700",
    },
    fontSize: {
      small: `${base/multi}px`,
      medium: `${base}px`,
      large: `${base*Math.pow(multi,2)}px`,
      "xlarge": `${base*Math.pow(multi,3)}px`,
      "2xlarge": `${base*Math.pow(multi,4)}px`,
      "3xlarge": `${base*Math.pow(multi,5)}px`,
      "4xlarge": `${base*Math.pow(multi,6)}px`,
    },
    textAlign: ["center", "left", "right"]
  }
});

export const position = defineProperties({
  properties: {
    position: ["sticky", "static", "relative", "absolute"],
    display: ["block", "inline-block", "block"]
  }
})

export const cursor = defineProperties({
  properties: {
    cursor: ["pointer", "default"]
  }
})

export const css = createSprinkles(padding, margin, color, fonts, size, position,cursor)