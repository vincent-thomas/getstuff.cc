/* eslint-disable */
export type Token = "colors.border" | "colors.text.1" | "colors.text.2" | "colors.accent.1" | "colors.accent.2" | "colors.background.1" | "colors.background.2" | "colors.hover" | "radii.radius" | "radii.full" | "borders.border" | "fontWeights.medium" | "fontWeights.semibold" | "fontWeights.bold" | "spacing.xs" | "spacing.sm" | "spacing.md" | "spacing.lg" | "spacing.xl" | "breakpoints.sm" | "breakpoints.md" | "breakpoints.lg" | "breakpoints.xl" | "breakpoints.2xl" | "sizes.breakpoint-sm" | "sizes.breakpoint-md" | "sizes.breakpoint-lg" | "sizes.breakpoint-xl" | "sizes.breakpoint-2xl" | "spacing.-xs" | "spacing.-sm" | "spacing.-md" | "spacing.-lg" | "spacing.-xl" | "colors.colorPalette" | "colors.colorPalette.1" | "colors.colorPalette.2"

export type ColorPalette = "border" | "text" | "accent" | "background" | "hover"

export type ColorToken = "border" | "text.1" | "text.2" | "accent.1" | "accent.2" | "background.1" | "background.2" | "hover" | "colorPalette" | "colorPalette.1" | "colorPalette.2"

export type RadiusToken = "radius" | "full"

export type BorderToken = "border"

export type FontWeightToken = "medium" | "semibold" | "bold"

export type SpacingToken = "xs" | "sm" | "md" | "lg" | "xl" | "-xs" | "-sm" | "-md" | "-lg" | "-xl"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type SizeToken = "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type AnimationName = "spin" | "ping" | "pulse" | "bounce"

export type Tokens = {
		colors: ColorToken
		radii: RadiusToken
		borders: BorderToken
		fontWeights: FontWeightToken
		spacing: SpacingToken
		breakpoints: BreakpointToken
		sizes: SizeToken
		animationName: AnimationName
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"