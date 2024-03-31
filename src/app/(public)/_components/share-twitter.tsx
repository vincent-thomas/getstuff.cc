
import { cn } from "@stuff/components/utils";
import { button } from "@stuff/ui/button/button.css";
import { css } from "src/components/styler.css";

export const ShareTwitter = ({blogId}: {blogId: string}) => {
  return (
    <a
      target="_blank"
      className={cn(button({variant: "ghost"}), css({p: "medium"}))}
      href={`https://twitter.com/intent/tweet?hashtags=stuffmail&url=${encodeURIComponent(`getstuff.cc/blog/${blogId}`)}`}
    >
      <img src={"/icons/external-sites/twitter/logo-white.png"} alt="Twitter Logo" width="20" height="20" />
    </a>
  )
}
