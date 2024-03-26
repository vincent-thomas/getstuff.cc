"use client"

import { buttonVariants } from "@stuff/ui/button/variants";
import { useTheme } from "next-themes"

export const ShareTwitter =() => {
  const theme = useTheme();
  const src = theme.theme === "dark" ? "/icons/external-sites/twitter/logo-white.png" : "/icons/external-sites/twitter/logo-black.png";

  return (
    <a
      target="_blank"
      className={buttonVariants({size: "icon", variant: "icon"})}
      href={`https://twitter.com/intent/tweet?hashtags=stuffmail&url=${encodeURIComponent(`getstuff.cc${window.location.pathname}`)}`}
    >
      <img src={src} alt="Twitter Logo" width="20" height="20" />
    </a>
  )
}