/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
	// @ts-expect-error because
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const color = palette[colorsKeys[colorBetter!]];
	if (side === "none") {
		return {
			border: "none",
		};
	}
	return [
		colorBetter,
		side,
		{
			// @ts-expect-error because
			[`border${type[side!]}Color`]: color,
			// @ts-expect-error because
			[`border${type[side!]}Style`]: "solid",
			// @ts-expect-error because
			[`border${type[side!]}Width`]: "1px",
		},
	];
});

const borderStyles = better
	// @ts-expect-error because
	.filter((v) => v?.border !== "none")
	.map((v) => ({
		variants: {
			// @ts-expect-error because
			side: v[1],
			// @ts-expect-error because
			color: v[0],
		},
		// @ts-expect-error because
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
			radius: { borderRadius: rounding.medium },
			lg: { borderRadius: rounding.large },
			xl: { borderRadius: rounding.xlarge },
			xxl: { borderRadius: rounding["2xlarge"] },
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
