import { style } from "@vanilla-extract/css";
import { spacing } from "packages/ui/variables";

export const blogContainer = style({
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gap: spacing.medium,
	justifyContent: "center",
	"@media": {
		"(max-width: 768px)": {
			gridTemplateColumns: "1fr",
		},
	},
});
