
import { buttonVariants } from "@stuff/ui/button/variants";
import { css, cx } from "styled-system/css";

export const ShareTwitter = ({blogId}: {blogId: string}) => {
  return (
    <a
      target="_blank"
      className={cx(buttonVariants({variant: "ghost"}), css({p: "md"}))}
      href={`https://twitter.com/intent/tweet?hashtags=stuffmail&url=${encodeURIComponent(`getstuff.cc/blog/${blogId}`)}`}
    >
      <img src={"/icons/external-sites/twitter/logo-white.png"} alt="Twitter Logo" width="20" height="20" />
    </a>
  )
}
