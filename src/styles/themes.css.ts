import {createGlobalTheme, createGlobalThemeContract} from "@vanilla-extract/css"

export const theme = createGlobalThemeContract({
  background: "background",
  background2: "background2",
  foreground: "foreground",
  muted: "muted",
  mutedForeground: "muted-foreground",
  border: "border",
  accent: "accent"
})

createGlobalTheme(".dark", theme, {
  background: "#111111",
  background2: "#191919",
  foreground: "#EEEEEE",
  muted: "hsl(12 6.5% 15.1%)",
  mutedForeground: "#B4B4B4",
  border: "#3A3A3A",
  accent: "#003F75"
})