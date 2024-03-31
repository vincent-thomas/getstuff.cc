import {createSprinkles, defineProperties} from "@vanilla-extract/sprinkles"
import { theme } from "src/styles/themes.css"

const space = {
  none: 0,
  small: "8px",
  medium: "12px",
  large: "16px",
  "x-large": "20px",
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
    marginLeft: {...space, push: "auto"},
    marginRight: {...space, push: "auto"}
  },
  shorthands: {
    m: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
    margin: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
    mX: ["marginLeft", "marginRight"],
    mY: ["marginTop", "marginBottom"]
  }
})

export const colors = {
  text1: theme.text,
  text2: theme.text2,
  hover: theme.hover,
  bg: theme.background,
  bg2: theme.background2,
  accent: theme.accent,
  accent2: theme.accent2,
}

export const color = defineProperties({
  properties: {
    color: colors,
    background: colors,
    borderColor: {
      border: theme.border,
    }
  },
  shorthands: {
    bg: ["background"],
  }
})

const multi = 1.2

export const fonts = defineProperties({
  properties: {
    fontWeight: {
      light: "400",
      normal: "normal",
      semibold: "600",
      bold: "700",
    },
    fontSize: {
      small: `${16}px`,
      medium: `${16*multi^1}px`,
      large: `${16*multi^2}px`,
    }
  }
})

export const css = createSprinkles(padding, margin, color, fonts)