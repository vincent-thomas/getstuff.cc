import { recipe } from "@vanilla-extract/recipes";
import { palette } from "packages/ui/theme/palettes.css";
import { rounding } from "packages/ui/variables";

function doBorder(arr1: string[], arr2: string[]) {
	const total = [];

	for (const a of arr1) {
		for (const b of arr2) {
			total.push([a, b]);
		}
	}

	return total;
}

const colorsKeys = {
	subtle: "borderSubtle",
	interactive: "borderComponent",
	focus: "borderFocus",
};

const colors = Object.keys(colorsKeys);
const sides = ["t", "r", "b", "l", "all", "none"];
const allShit = doBorder(colors, sides);

const type = {
	t: "Top",
	l: "Left",
	r: "Right",
	b: "Bottom",
	all: "",
};

const better = allShit.map(([colorBetter, side]) => {
	const color = palette[colorsKeys[colorBetter as string]];
	if (side === "none") {
		return {
			border: "none",
		};
	}
	return [
		colorBetter,
		side,
		{
			[`border${type[side as string]}Color`]: color,
			[`border${type[side as string]}Style`]: "solid",
			[`border${type[side as string]}Width`]: "1px",
		},
	];
});

const borderStyles = better
	.filter((v) => v?.border !== "none")
	.map((v) => ({
		variants: {
			side: v[1],
			color: v[0],
		},
		style: v[2],
	}));

export const border = recipe({
	variants: {
		color: {
			subtle: {},
			interactive: {},
			focus: {},
		},
		rounded: {
			radius: rounding.md,
			lg: rounding.lg,
			xl: rounding.xl,
			xxl: rounding.xxl,
			circle: {
				borderRadius: "50%",
			},
		},
		side: {
			t: {},
			r: {},
			b: {},
			l: {},
			all: {},
			none: {},
		},
	},
	compoundVariants: borderStyles,
	defaultVariants: {
		side: "none",
	},
});
