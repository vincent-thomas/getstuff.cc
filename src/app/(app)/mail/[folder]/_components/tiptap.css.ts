import { globalStyle } from "@vanilla-extract/css";

globalStyle(".tiptap p.is-editor-empty:first-child::before", {
	color: `${palette.text1} !important`,
	content: "attr(data-placeholder)",
	float: "left",
	height: 0,
	pointerEvents: "none",
	fontWeight: 600,
});
