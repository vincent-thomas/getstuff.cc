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

createGlobalTheme(".dark", theme, {
  background: "#111111",
  background2: "#191919",
  card: "#222222",
  hover: theme.card,
  text: "#EEEEEE",
  text2: "#B4B4B4",
  // muted: "hsl(12 6.5% 15.1%)",
  // mutedForeground: "#B4B4B4",
  border: "#3A3A3A",
  accent: "#E5484D",
  accent2: "#EC5D5E",
  highlight: "#2A2A2A"
})