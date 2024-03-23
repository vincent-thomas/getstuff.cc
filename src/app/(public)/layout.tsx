import { Navbar } from "./_components/navbar";
import { Section } from "./_components/section";
import { CookieTeller } from "./_components/cookie-teller";
import type { LayoutProps } from "src/types/router";
import { Button } from "@stuff/ui/button";
import { buttonVariants } from "@stuff/ui/button/variants";
import Link from "next/link";
import { Flex } from "@stuff/structure";
import { cn } from "@stuff/components/utils";

const Layout = (props: LayoutProps) => (
  <>
    <CookieTeller />
    <Navbar />
    <main className="flex flex-col">
      {props.children}
    </main>
    <footer className="bottom-0 relative">
      <Section className="flex flex-col items-start gap-6">
        <Flex col gap="1rem" align="start">
          <h2 className="text-4xl font-bold">Want to try?</h2>
          <h3 className="text-2xl font-bold">Start a free trial here:</h3>
          <Button size="lg">Start trail</Button>
        </Flex>
        <Flex className="w-full flex" justify="between">
          <Flex align="center" gap="0.5rem" className="max-sm:hidden">
            <img src="/me.jpg" width={30} height={30} className="rounded-full" alt="me who built the app" />
            <p>© 2021 Stuff</p><span>•</span>
            <a href="https://github.com/vincent-thomas" target="_blank" className={cn("!pl-0",buttonVariants({variant: "link", size: "xs"}))}>Vincent Thomas</a>
          </Flex>
          <Flex gap="1rem">
            <Link
              href="/cookies"
              className={buttonVariants({ variant: "link" })}
            >
              Cookies
            </Link>
            <Link
              href="/privacy-policy"
              className={buttonVariants({ variant: "link" })}
            >
              Privacy policy
            </Link>
          </Flex>
        </Flex>
      </Section>
    </footer>
  </>
)

export default Layout;