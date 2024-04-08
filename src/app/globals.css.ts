import { globalStyle } from "@vanilla-extract/css";
import { palette } from "packages/ui/theme/palettes.css";

globalStyle("*", {
	scrollbarWidth: "thin",
	scrollbarColor: palette.background2,
});