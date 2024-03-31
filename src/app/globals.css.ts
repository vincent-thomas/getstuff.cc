import { globalStyle } from "@vanilla-extract/css";
import { theme } from "src/styles/themes.css";

globalStyle("*", {
  scrollbarWidth: "thin",
  scrollbarColor: theme.background2
})