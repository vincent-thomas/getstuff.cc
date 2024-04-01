import { createThemeContract, globalStyle } from "@vanilla-extract/css";


export const colors = createThemeContract({
  accentForeground: null,
  accent1: null,
  accent2: null,
});

export enum THEME {
  RED = "theme-red",
  BLUE = "theme-blue",
  INDIGO = "theme-indigo",
  AMBER = "theme-amber",
  LIME = "theme-lime",
  ORANGE_RED = "theme-tomato",
  RUBY = "theme-ruby",
}

globalStyle(`.dark .${THEME.RED}`, {
  vars: {
    [colors.accentForeground]: "#FFFFFF",
    [colors.accent1]: "#E5484D",
    [colors.accent2]: "#B54444"
  }
})

globalStyle(`.light .${THEME.RED}`, {
  vars: {
    [colors.accentForeground]: "#000",
    [colors.accent1]: "#E5484D",
    [colors.accent2]: "#D73840"
  }
})

globalStyle(`.dark .${THEME.BLUE}`, {
  vars: {
    [colors.accentForeground]: "#fff",
    [colors.accent1]: "#0090FF",
    [colors.accent2]: "#3B9EFF"
  }
})

globalStyle(`.light .${THEME.BLUE}`, {
  vars: {
    [colors.accentForeground]: "#000",
    [colors.accent1]: "#0090FF",
    [colors.accent2]: "#0086F0FA"
  }
})

globalStyle(`.dark .${THEME.INDIGO}`, {
  vars: {
    [colors.accentForeground]: "white",
    [colors.accent1]: "#3E63DD",
    [colors.accent2]: "#5472E4"
  }
})

globalStyle(`.light .${THEME.INDIGO}`, {
  vars: {
    [colors.accentForeground]: "white",
    [colors.accent1]: "#3E63DD",
    [colors.accent2]: "#3358D4"
  }
})

globalStyle(`.dark .${THEME.AMBER}`, {
  vars: {
    [colors.accentForeground]: "black",
    [colors.accent1]: "#FFC53D",
    [colors.accent2]: "#FFD60A"
  }
})

globalStyle(`.light .${THEME.AMBER}`, {
  vars: {
    [colors.accentForeground]: "black",
    [colors.accent1]: "#FFC53D",
    [colors.accent2]: "#FFBA18"
  }
})

globalStyle(`.dark .${THEME.LIME}`, {
  vars: {
    [colors.accentForeground]: "black",
    [colors.accent1]: "#BDEE63",
    [colors.accent2]: "#D4FF70"
  }
})

globalStyle(`.light .${THEME.LIME}`, {
  vars: {
    [colors.accentForeground]: "black",
    [colors.accent1]: "#BDEE63",
    [colors.accent2]: "#B0E64C"
  }
})

globalStyle(`.dark .${THEME.ORANGE_RED}`, {
  vars: {
    [colors.accentForeground]: "black",
    [colors.accent1]: "#E54D2E",
    [colors.accent2]: "#EC6142"
  }
})

globalStyle(`.light .${THEME.ORANGE_RED}`, {
  vars: {
    [colors.accentForeground]: "black",
    [colors.accent1]: "#E54D2E",
    [colors.accent2]: "#DD4425"
  }
})

globalStyle(`.dark .${THEME.RUBY}`, {
  vars: {
    [colors.accentForeground]: "black",
    [colors.accent1]: "#E54666",
    [colors.accent2]: "#EC5A72"
  }
})

globalStyle(`.light .${THEME.RUBY}`, {
  vars: {
    [colors.accentForeground]: "black",
    [colors.accent1]: "#E54666",
    [colors.accent2]: "#DC3B5D"
  }
})