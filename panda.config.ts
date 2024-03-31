import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  jsxFramework: "react",
  hash: false,
  lightningcss: true,
  include: ["./src/**/*.{ts,tsx}","./packages/components/**/*.{ts,tsx}"],
  cssVarRoot: "body",
  strictTokens: true,
  patterns: {
    extend: {
      stack: {
        defaultValues: {
          gap: "md"
        }
      },
    }
  },
  theme: {
    tokens: {
      sizes: {
        full: {
          value: "100%",
          description: "Full width or height"
        }
      },
      spacing: {
        xs: {
          value: "4px"
        },
        sm: {
          value: "6px"
        },
        md: {
          value: "10px"
        },
        lg: {
          value: "14px"
        },
        xl: {
          value: "16px"
        },
        none: {
          value: "0px"
        }
      },
 
      colors: {
        transparent: {value: "transparent"},
        border: {
          value: "var(--border)",
          description: "Border color"
        },
        card: {
          value: "var(--background2)",
          description: "Card color"
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
        none: {
          value: "none"
        },
        border: {
          border: {
            color: {
              value: "var(--border)",
              description: "Border color"
            },
            width: {
              value: "1px",
              description: "Border width"
            },
            style: {
              value: "solid",
              description: "Border style"
            }
          },
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