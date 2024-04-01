import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";


export const themeMode = createThemeContract({
  background1: null,
  background2: null,

  hover: null,

  "border": null,

  "text1": null,
  "text2": null,

  interactive1: null,
  interactive2: null,
  interactive3: null,
})

createGlobalTheme(".dark", themeMode, {
  "background1": "#111111",
  border: "#3A3A3A",
  "text1": "#EEEEEE",
  text2: "#B4B4B4",
  background2: '#191919',

  hover: "#222222",

  interactive1: "#222222",
  interactive2: "#2A2A2A",
  interactive3: "#313131"
})

createGlobalTheme(".light", themeMode, {
  background1: "#FCFCFC",
  background2: '#F9F9F9',

  border: "#D9D9D9",

  hover: "#F0F0F0",

  text1: "#202020",
  text2: "#646464",

  interactive1: "#F0F0F0",
  interactive2: "#E8E8E8",
  interactive3: "#E0E0E0"
})