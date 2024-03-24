import { type Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  content: ["./src/**/*.tsx", "packages/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      padding: {
        "space-md": "var(--space-md)",
        "space-sm": "var(--space-sm)",
        "space-lg": "var(--space-lg)"
      },
      gap: {
        "space-md": "var(--space-md)",
        "space-sm": "var(--space-sm)",
        "space-lg": "var(--space-lg)"
      },
      colors: {
        border: "var(--border)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        background2: "var(--background2)",
        text: "var(--text)",
        text2: "var(--text2)",
        hover: "var(--hover)",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        highlight: "var(--highlight)",
        // accent: {
        //   DEFAULT: "var(--accent)",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
