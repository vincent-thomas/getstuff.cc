import { globalStyle } from "@vanilla-extract/css";
import { colors, themeMode } from "packages/ui/theme";

globalStyle(".cls-5", {
	isolation: "isolate",
	opacity: 0.24,
	fill: colors.accent1,
});

globalStyle(".cls-7", {
	fill: colors.accent1,
});

globalStyle(".cls-1, .cls-4, .cls-3, .cls-2", {
	fill: themeMode.backgroundApp,
});
