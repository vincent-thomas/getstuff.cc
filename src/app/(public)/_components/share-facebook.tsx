import { cn } from "@stuff/components/utils";
import { button } from "@stuff/ui/button/button.css";

export const ShareFacebook = ({ blogId }: { blogId: string }) => {
  const url = encodeURIComponent(`getstuff.cc/blog/${blogId}`);
  return (
    <a
      className={cn(button({ variant: "ghost" }), css({ p: "medium" }))}
      href={`http://www.facebook.com/share.php?u=${url}`}
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={"/icons/external-sites/facebook/logo-black.png"}
        alt="Twitter Logo"
        width="20"
        height="20"
      />
    </a>
  );
};
