const tokens = {
  "colors.border": {
    "value": "var(--border)",
    "variable": "var(--colors-border)"
  },
  "colors.text.1": {
    "value": "var(--text)",
    "variable": "var(--colors-text-1)"
  },
  "colors.text.2": {
    "value": "var(--text2)",
    "variable": "var(--colors-text-2)"
  },
  "colors.accent.1": {
    "value": "var(--accent)",
    "variable": "var(--colors-accent-1)"
  },
  "colors.accent.2": {
    "value": "var(--accent2)",
    "variable": "var(--colors-accent-2)"
  },
  "colors.background.1": {
    "value": "var(--background)",
    "variable": "var(--colors-background-1)"
  },
  "colors.background.2": {
    "value": "var(--background2)",
    "variable": "var(--colors-background-2)"
  },
  "colors.hover": {
    "value": "var(--hover)",
    "variable": "var(--colors-hover)"
  },
  "radii.radius": {
    "value": "var(--radius)",
    "variable": "var(--radii-radius)"
  },
  "radii.full": {
    "value": "50%",
    "variable": "var(--radii-full)"
  },
  "borders.border": {
    "value": "var(--border)",
    "variable": "var(--borders-border)"
  },
  "fontWeights.medium": {
    "value": "500",
    "variable": "var(--font-weights-medium)"
  },
  "fontWeights.semibold": {
    "value": "600",
    "variable": "var(--font-weights-semibold)"
  },
  "fontWeights.bold": {
    "value": "700",
    "variable": "var(--font-weights-bold)"
  },
  "spacing.xs": {
    "value": "4px",
    "variable": "var(--spacing-xs)"
  },
  "spacing.sm": {
    "value": "8px",
    "variable": "var(--spacing-sm)"
  },
  "spacing.md": {
    "value": "12px",
    "variable": "var(--spacing-md)"
  },
  "spacing.lg": {
    "value": "16px",
    "variable": "var(--spacing-lg)"
  },
  "spacing.xl": {
    "value": "20px",
    "variable": "var(--spacing-xl)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "spacing.-xs": {
    "value": "calc(var(--spacing-xs) * -1)",
    "variable": "var(--spacing-xs)"
  },
  "spacing.-sm": {
    "value": "calc(var(--spacing-sm) * -1)",
    "variable": "var(--spacing-sm)"
  },
  "spacing.-md": {
    "value": "calc(var(--spacing-md) * -1)",
    "variable": "var(--spacing-md)"
  },
  "spacing.-lg": {
    "value": "calc(var(--spacing-lg) * -1)",
    "variable": "var(--spacing-lg)"
  },
  "spacing.-xl": {
    "value": "calc(var(--spacing-xl) * -1)",
    "variable": "var(--spacing-xl)"
  },
  "colors.colorPalette": {
    "value": "var(--colors-color-palette)",
    "variable": "var(--colors-color-palette)"
  },
  "colors.colorPalette.1": {
    "value": "var(--colors-color-palette-1)",
    "variable": "var(--colors-color-palette-1)"
  },
  "colors.colorPalette.2": {
    "value": "var(--colors-color-palette-2)",
    "variable": "var(--colors-color-palette-2)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar