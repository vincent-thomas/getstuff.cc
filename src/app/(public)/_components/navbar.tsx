import { button } from "@stuff/ui/button/button.css";
import { Logo } from "src/components/logo";
import { stack } from "src/components/recipies";
import { Link } from "src/components/structure/link";
import { StuffBranding } from "./stuff";

export const Navbar = () => (
  <header>
    <div
      className={cn(
        css({ padding: "medium" }),
        stack({ direction: "row", align: "center", justify: "between" }),
      )}
    >
      <div className={stack({ direction: "row", gap: "md", align: "center" })}>
        <Link
          className={cn(
            button({ variant: "link", size: "sm" }),
            stack({ gap: "sm", align: "center" }),
          )}
          href="/"
        >
          <Logo size={24} color />
          <h1
            className={cn(
              css({
                color: "text1",
                fontWeight: "bold",
                fontSize: "large",
              }),
            )}
          >
            <StuffBranding />
          </h1>
        </Link>

        <Link
          href="/pricing"
          className={button({
            variant: "link",
            size: "md",
            rounded: "medium",
          })}
        >
          Pricing
        </Link>

        <Link
          href="/blog"
          className={button({
            variant: "link",
            size: "md",
            rounded: "medium",
          })}
        >
          Blog
        </Link>
      </div>
      <nav className={stack({ direction: "row", gap: "xl", align: "center" })}>
        <Link
          href="/identify"
          className={cn(
            css({ fontWeight: "semibold" }),
            button({ variant: "link", size: "md", rounded: "medium" }),
          )}
        >
          Login
        </Link>

        <Link
          href="/auth/init"
          className={cn(
            css({ fontWeight: "semibold" }),
            button({ variant: "accent", size: "lg", rounded: "medium" }),
          )}
        >
          Get Stuff free
        </Link>
      </nav>
    </div>
  </header>
);
