import { keyframes } from "@vanilla-extract/css";
import {createSprinkles, defineProperties} from "@vanilla-extract/sprinkles"
import { colors, themeMode } from "packages/ui/theme";
import { theme } from "src/styles/themes.css";



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
  small: "8px",
  medium: "12px",
  large: "16px",
  "x-large": "20px",
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

const multi = 1.4;
const base = 16;



export const fonts = defineProperties({
  properties: {
    fontWeight: {
      light: "400",
      normal: "normal",
      semibold: "600",
      bold: "700",
    },
    fontSize: {
      xsmall: `${base}px`,
      small: `${base*multi}px`,
      medium: `${base*Math.pow(multi,2)}px`,
      large: `${base*Math.pow(multi,3)}px`,
      "xlarge": `${base*Math.pow(multi,4)}px`,
      "2xlarge": `${base*Math.pow(multi,5)}px`,
    }
  }
})

export const css = createSprinkles(padding, margin, color, fonts, size)

export const spinKeyFrame = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" }
})