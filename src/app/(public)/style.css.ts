import { globalStyle } from "@vanilla-extract/css";
import { palette } from "packages/ui/theme/palettes.css";

globalStyle(".cls-5", {
	isolation: "isolate",
	opacity: 0.24,
	fill: palette.solid1,
});

globalStyle(".cls-7", {
	fill: palette.solid1,
});

globalStyle(".cls-1, .cls-4, .cls-3, .cls-2", {
	fill: palette.background1,
});
