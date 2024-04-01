import { createThemeContract, globalStyle } from "@vanilla-extract/css";


export const colors = createThemeContract({
  accentForeground: null,
  accent1: null,
  accent2: null,
});

globalStyle(".dark .red", {
  vars: {
    [colors.accentForeground]: "#FFFFFF",
    [colors.accent1]: "#E5484D",
    [colors.accent2]: "#B54444"
  }
})

globalStyle(".light .red", {
  vars: {
    [colors.accentForeground]: "#000",
    [colors.accent1]: "#E5484D",
    [colors.accent2]: "#D73840"
  }
})

globalStyle(".dark .blue", {
  vars: {
    [colors.accentForeground]: "#fff",
    [colors.accent1]: "#0090FF",
    [colors.accent2]: "#3B9EFF"
  }
})

globalStyle(".light .blue", {
  vars: {
    [colors.accentForeground]: "#000",
    [colors.accent1]: "#0090FF",
    [colors.accent2]: "#0086F0FA"
  }
})

globalStyle(".dark .indigo", {
  vars: {
    [colors.accentForeground]: "white",
    [colors.accent1]: "#3E63DD",
    [colors.accent2]: "#5472E4"
  }
})

globalStyle(".light .indigo", {
  vars: {
    [colors.accentForeground]: "white",
    [colors.accent1]: "#3E63DD",
    [colors.accent2]: "#3358D4"
  }
})