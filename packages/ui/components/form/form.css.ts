import { style } from "@vanilla-extract/css";
import { border } from "src/components/recipies";

export const formErrorStyle = style([
	css({ p: "medium" }),
	border({ rounded: "radius" }),
	{
		":empty": {
			display: "none",
		},
		width: "fit-content",
		backgroundColor: "#472b2c",
		color: "hsl(357 100% 90%)",
	},
]);
