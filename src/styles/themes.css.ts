import {createGlobalTheme, createGlobalThemeContract} from "@vanilla-extract/css"

export const theme = createGlobalThemeContract({
  background: "background",
  background2: "background2",
  // muted: "muted",
  // mutedForeground: "muted-foreground",
  border: "border",
  accent: "accent",
  accent2:"accent2",
  text: "text",
  text2: "text2",
  card: "card",
  hover: "hover",
  highlight: "highlight"
})

createGlobalTheme(".light", theme, {
  background: "#FCFCFC",
  background2: "#F0F0F0",

  border: "#D9D9D9",
  card: "#F0F0F0",
  hover: theme.card,
  highlight: "#E8E8E8",

  accent: "#E5484D",
  accent2: "#DC3E42",

  text: "#202020",
  text2: "#646464",
})

createGlobalTheme(".dark", theme, {
  background: "#111111",
  background2: "#191919",

  card: "#222222",
  hover: theme.card,
  border: "#3A3A3A",
  highlight: "#2A2A2A",

  accent: "#E5484D",
  accent2: "#EC5D5E",

  text: "#EEEEEE",
  text2: "#B4B4B4",
  

})