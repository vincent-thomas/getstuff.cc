import { keyframes } from "@vanilla-extract/css";

export const fadeEnter = keyframes({
  "0%": { opacity: "0", scale: "0.985" },
  "100%": { opacity: "1", scale: "1" },
});

export const fadeOut = keyframes({
  "0%": { opacity: "1", scale: "1" },
  "100%": { opacity: "0", scale: "0.985" },
});
