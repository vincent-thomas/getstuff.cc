import { defineConfig } from "@pandacss/dev"
 
export default defineConfig({
  preflight: true,

  jsxFramework: "react",
  hash: false,
  lightningcss: true,
  include: ["./src/**/*.{ts,tsx}","./packages/components/**/*.{ts,tsx}"],
  theme: {
    tokens: {
      colors: {
        border: {
          value: "var(--border)",
          description: "Border color"
        },
        text: {
          1: {
            value: "var(--text)",
            description: "Used for emphasized text like headers or icons"
          },
          2: {
            value: "var(--text2)",
            description: "Used for non emphasized text like descriptions or text"
          }
        },
        accent: {
          1: {
            value: "var(--accent)",
            description: "Brand accent"
          },
          2: {
            value: "var(--accent2)",
            description: "Brand accent"
          }
        },
        background: {
          1: {
            value: "var(--background)",
            description: "Main background, can also be used reverse with background2"
          },
          2: {
            value: "var(--background2)",
            description: "Secondary background, can also be used reverse with background"
          }
        },
        hover: {
          value: "var(--hover)",
          description: "Hover color"
        }
      },
      radii: {
        radius: {
          value: "var(--radius)",
          description: "Medium border radius"
        },
        full: {
          value: "50%",
          description: "Full border radius"
        }
      },
      borders: {
        border: {
          value: "var(--border)",
          description: "Border color"
        }
      },
      fontWeights: {
        medium: {
          value: "500",
          description: "Medium font weight"
        },
        semibold: {
          value: "600",
          description: "Semibold font weight"
        },
        bold: {
          value: "700",
          description: "Bold font weight"
        }
      },
      spacing: {
        xs: {
          value: "4px"
        },
        sm: {
          value: "8px"
        },
        md: {
          value: "12px"
        },
        lg: {
          value: "16px"
        },
        xl: {
          value: "20px"
        }
      }
    },
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    }
  },
  exclude: [],
  outdir: "styled-system",
})