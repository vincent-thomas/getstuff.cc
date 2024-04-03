import { globalStyle } from "@vanilla-extract/css";
import { colors } from "packages/ui/theme";

globalStyle("*", {
	scrollbarWidth: "thin",
	scrollbarColor: colors.accent1,
});
