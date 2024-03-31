import { buttonVariants } from "@stuff/ui/button/variants";
import { css, cx } from "styled-system/css";

export const ShareFacebook =({blogId}: {blogId: string}) => {
  const url = encodeURIComponent(`getstuff.cc/blog/${blogId}`);
  return (
    <a
      className={cx(buttonVariants({variant: "ghost"}), css({p: "md"}))}
      href={`http://www.facebook.com/share.php?u=${url}`}
      target="_blank"
    >
      <img src={"/icons/external-sites/facebook/logo-black.png"} alt="Twitter Logo" width="20" height="20" />
    </a>
  )
}
