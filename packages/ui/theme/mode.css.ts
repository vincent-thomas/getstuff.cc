import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";

export const themeMode = createThemeContract({
	/**
	 * Main app background
	 */
	backgroundApp: null,
	// backgroundSubtle: null,
	/**
	 * Background for interactive components
	 */
	backgroundComponent: null,
	/**
	 * Background for hover states
	 */
	backgroundHover: null,
	/**
	 * Background for selected states
	 */
	backgroundSelected: null,
	/**
	 * Subtle border
	 */
	borderSubtle: null,
	/**
	 * Interactive border
	 */
	borderInteractive: null,
	/**
	 * Focus border
	 */
	borderFocus: null,

	text1: null,
	text2: null,
});

createGlobalTheme(".dark", themeMode, {
	backgroundApp: "#111111",
	// backgroundSubtle: "#004DF211",

	backgroundComponent: "#222222",
	backgroundHover: "#2A2A2A",
	backgroundSelected: "#313131",

	borderSubtle: "#3A3A3A",
	borderInteractive: "#484848",
	borderFocus: "#606060",
	text1: "#EEEEEE",
	text2: "#B4B4B4",
});

createGlobalTheme(".light", themeMode, {
	backgroundApp: "#FCFCFC",
	// backgroundSubtle: "#F4FAFF",
	backgroundComponent: "#F0F0F0",
	borderSubtle: "#D9D9D9",
	borderInteractive: "#CECECE",
	borderFocus: "#BBBBBB",
	backgroundHover: "#E8E8E8",
	backgroundSelected: "#E0E0E0",

	text1: "#202020",
	text2: "#646464",
});
