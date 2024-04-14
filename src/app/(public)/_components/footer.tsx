import { button } from "@stuff/ui/button/button.css";
import { Text1 } from "packages/ui/atoms";
import { stack } from "packages/ui/patterns/stack";
import { Link } from "src/components/structure/link";
import { Section } from "./section";

export const Footer = () => {
  return (
    <footer
      className={css({ width: "full", p: "large", paddingBottom: "2xlarge" })}
    >
      <Section maxWidth="lg">
        <div className={stack({ justify: "between" })}>
          <div className={stack({ align: "center", gap: "sm" })}>
            <Text1>Stuff © {new Date().getFullYear()}</Text1>
            <Text1>•</Text1>
            <Link
              href="https://github.com/vincent-thomas"
              target="_blank"
              className={button({ variant: "link" })}
              rel="noreferrer"
            >
              Vincent Thomas
            </Link>
          </div>
          <div className={stack({ gap: "xl" })}>
            <Link href="/cookies" className={button({ variant: "link" })}>
              Cookies
            </Link>
            <Link
              href="/privacy-policy"
              className={button({ variant: "link" })}
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </Section>
    </footer>
  );
};
