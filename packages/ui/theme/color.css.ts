import { createThemeContract, globalStyle } from "@vanilla-extract/css";

export const colors = createThemeContract({
	bgSubtle: null,
	bgComponent: null,

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
	SKY = "theme-sky"
}

globalStyle(`.dark .${THEME.RED}`, {
	vars: {
		[colors.bgSubtle]: "#201314",
		[colors.accentForeground]: "#FFFFFF",
		[colors.accent1]: "#E5484D",
		[colors.accent2]: "#B54444",
	},
});

globalStyle(`.light .${THEME.RED}`, {
	vars: {
		[colors.bgSubtle]: "#FFF7F7",
		[colors.accentForeground]: "#000",
		[colors.accent1]: "#E5484D",
		[colors.accent2]: "#D73840",
	},
});

globalStyle(`.dark .${THEME.BLUE}`, {
	vars: {
		[colors.bgComponent]: "#0D2847",
		[colors.bgSubtle]: "#111927",
		[colors.accentForeground]: "#fff",
		[colors.accent1]: "#0090FF",
		[colors.accent2]: "#3B9EFF",
	},
});

globalStyle(`.light .${THEME.BLUE}`, {
	vars: {
		[colors.bgComponent]: "#E6F4FE",
		[colors.bgSubtle]: "#F4FAFF",
		[colors.accentForeground]: "#000",
		[colors.accent1]: "#0090FF",
		[colors.accent2]: "#0086F0FA",
	},
});

globalStyle(`.dark .${THEME.AMBER}`, {
	vars: {
		[colors.bgSubtle]: "#1D180F",
		[colors.accentForeground]: "black",
		[colors.accent1]: "#FFC53D",
		[colors.accent2]: "#FFD60A",
	},
});

globalStyle(`.light .${THEME.AMBER}`, {
	vars: {
		[colors.bgSubtle]: "#FEFBE9",
		[colors.accentForeground]: "black",
		[colors.accent1]: "#FFC53D",
		[colors.accent2]: "#FFBA18",
	},
});

globalStyle(`.dark .${THEME.ORANGE_RED}`, {
	vars: {
		[colors.bgComponent]: "#391714",
		[colors.bgSubtle]: "#1F1513",
		[colors.accentForeground]: "black",
		[colors.accent1]: "#E54D2E",
		[colors.accent2]: "#EC6142",
	},
});

globalStyle(`.light .${THEME.ORANGE_RED}`, {
	vars: {
		[colors.bgComponent]: "#FEEBE7",
		[colors.bgSubtle]: "#FFF8F7",
		[colors.accentForeground]: "black",
		[colors.accent1]: "#E54D2E",
		[colors.accent2]: "#DD4425",
	},
});

globalStyle(`.light .${THEME.SKY}`, {
	vars: {
		[colors.bgComponent]: "#E1F6FD",
		[colors.bgSubtle]: "#F1FAFD",
		[colors.accentForeground]: "black",
		[colors.accent1]: "#7CE2FE",
		[colors.accent2]: "#74DAF8",
	},
});
