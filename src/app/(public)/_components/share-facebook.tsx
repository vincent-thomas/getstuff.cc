import { buttonVariants } from "@stuff/ui/button/variants";

export const ShareFacebook =({blogId}: {blogId: string}) => {
  const url = encodeURIComponent(`getstuff.cc/blog/${blogId}`);
  return (
    <a
      className={buttonVariants({size: "icon", variant: "icon"})}
      href={`http://www.facebook.com/share.php?u=${url}`}
      target="_blank"
    >
      <img src={"/icons/external-sites/facebook/logo-black.png"} alt="Twitter Logo" width="20" height="20" />
    </a>
  )
}
