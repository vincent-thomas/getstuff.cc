"use client"

import { buttonVariants } from "@stuff/ui/button/variants";
import { useTheme } from "next-themes"

export const ShareFacebook =() => {
  const theme = useTheme();
  const src = theme.theme === "dark" ? "/icons/external-sites/facebook/logo-white.png" : "/icons/external-sites/facebook/logo-black.png";

  const url = encodeURIComponent(`getstuff.cc/${window.location.pathname}`);
  return (
    <a
      className={buttonVariants({size: "icon", variant: "icon"})}
      href={`http://www.facebook.com/share.php?u=${url}`}
      target="_blank"
    >
      <img src={src} alt="Twitter Logo" width="20" height="20" />
    </a>
  )
}