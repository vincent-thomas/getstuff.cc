import { style } from "@vanilla-extract/css";
import { spacing } from "packages/ui/variables";

export const boxGrid = style({
	display: "grid",
	gridTemplateAreas: `
  "conversations conversations"
  "folders extensions"
  `,
	gap: spacing.large,
	paddingTop: spacing.xlarge,

	"@media": {
		"(max-width: 768px)": {
			gridTemplateAreas: `
      "conversations"
      "folders"
      "extensions"
      `,
		},
	},
});

export const conversations = style({
	gridArea: "conversations",
	border: "1px solid hsl(var(--border))",
});

export const folders = style({
	gridArea: "folders",
	border: "1px solid hsl(var(--border))",
});

export const extensions = style({
	gridArea: "extensions",
	border: "1px solid hsl(var(--border))",
});

export const imageRotate = style({
	width: "100%",
	"@media": {
		"(min-width: 768px)": {
			width: "80%",
			transform: "rotate(8deg) skewY(-12deg)",
		},
	},
});
