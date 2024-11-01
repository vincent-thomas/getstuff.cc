/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { recipe } from "@vanilla-extract/recipes";
import { rounding } from "packages/ui/variables";
import { z } from "zod";

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
  transparent: "transparent",
};

const colors = Object.keys(colorsKeys);
const sides = ["t", "r", "b", "l", "all", "none"];
const allShit = doBorder(colors, sides);

const Type = {
  t: "Top",
  l: "Left",
  r: "Right",
  b: "Bottom",
  all: "",
};

const better = allShit.map(([colorBetter, side]) => {
  // @ts-expect-error because
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const color = palette[colorsKeys[colorBetter]];
  side = z.string().parse(side);
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
      [`border${Type[side]}Color`]: color,
      // @ts-expect-error because
      [`border${Type[side]}Style`]: "solid",
      // @ts-expect-error because
      [`border${Type[side]}Width`]: "1px",
    },
  ];
});

const borderStyles = better
  // @ts-expect-error because
  .filter(v => v?.border !== "none")
  .map(v => ({
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
      transparent: {},
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
