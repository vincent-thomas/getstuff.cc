import { style } from "@vanilla-extract/css";

export const boxGrid = style({
  display: "grid",
  gridTemplateAreas: `
  "conversations conversations"
  "folders extensions"
  `,
  gap: "14px",
  paddingTop: "1rem",

  "@media": {
    "(max-width: 768px)": {
      gridTemplateAreas: `
      "conversations"
      "folders"
      "extensions"
      `,
    }
  }
})

export const conversations = style({
  gridArea: "conversations",
  border: "1px solid hsl(var(--border))"
})

export const folders = style({
  gridArea: "folders",
  border: "1px solid hsl(var(--border))"
})

export const extensions = style({
  gridArea: "extensions",
  border: "1px solid hsl(var(--border))"
})