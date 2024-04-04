import { createTheme } from "@vanilla-extract/css";

export const [themeClass, palette] = createTheme({
	/**
	 * Used for main app background
	 */
	background1: "#111111",

	background2: "#191919",
	bgComponent: "#222222",
	bgHover: "#2A2A2A",
	bgSelected: "#313131",
	borderSubtle: "#3A3A3A",
	borderComponent: "#484848",
	borderFocus: "#606060",
	solid1: "#FFC53D",
	solid2: "#FFD60A",
	text1: "#B4B4B4",
	text2: "#EEEEEE",
});
