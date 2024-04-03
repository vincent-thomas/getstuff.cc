import { recipe } from "@vanilla-extract/recipes";
import { themeMode } from "packages/ui/theme";
import { rounding } from "packages/ui/variables";

const base = {};

function doBorder(arr1: string[], arr2: string[]) {
	const total = [];

	for (const a of arr1) {
		for (const b of arr2) {
			total.push([a, b]);
		}
	}

	return total;
}

const colors = ["borderSubtle", "borderInteractive", "borderFocus"];
const sides = ["t", "r", "b", "l", "all", "none"];
const allShit = doBorder(colors, sides);

const type = {
	t: "Top",
	l: "Left",
	r: "Right",
	b: "Bottom",
	all: "",

}

const better = allShit.map(([colorBetter, side]) => {
	const color = themeMode[colorBetter as string];
	if (side === "none") {
		return {
			border: "none",
		}
	}
	return [colorBetter, side, {
		[`border${type[side as string]}Color`]: color,
		[`border${type[side as string]}Style`]: "solid",
		[`border${type[side as string]}Width`]: "1px",
}]});

console.log(better.filter(v => v?.border !== "none").map(v => ({
	variants: {
		side: v[1]
	}
})))

export const border = recipe({
	variants: {
		color: {
			subtle: {
				...base,
				borderColor: themeMode.borderSubtle,
			},
			interactive: {
				...base,
				borderColor: themeMode.borderInteractive,
			},
			focus: {
				...base,
				borderColor: themeMode.borderFocus,
			},
		},
		rounded: {
			radius: rounding.md,
			lg: rounding.lg,
			xl: rounding.xl,
			circle: {
				borderRadius: "50%",
			},
		},
		side: {
			t: {
				borderStyle: "solid",
				borderTopWidth: "1px",
			},
			r: {
				borderStyle: "solid",
				borderRightWidth: "1px",
			},
			b: {
				borderStyle: "solid",
				borderBottomWidth: "1px",
			},
			l: {
				borderStyle: "solid",
				borderLeftWidth: "1px",
			},
			all: {
				borderStyle: "solid",
				borderWidth: "1px",
			},
			none: {}
		},
	},
	defaultVariants: {
		side: "none",
	},
})