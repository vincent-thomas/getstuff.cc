import { Flex } from "@stuff/structure";
import { buttonVariants } from "@stuff/ui/button/variants";
import Link from "next/link";
import { cn } from "packages/components/utils";
import { Logo } from "src/components/logo";
import { StuffBranding } from "./stuff";
import { ThemeBtn } from "./theme-icon";
import { css } from "styled-system/css";
import { Stack } from "styled-system/jsx";

export const Navbar = () => (
  <header className="animate-in slide-in-from-top-2 duration-700 fade-in">
    <Flex className="p-3" justify="between" align="center">
      <Stack direction="row" gap="xl" align="center">
        <Link href="/" className={buttonVariants({variant: "ghost", size: "md"})}>
          <Logo size={24} color />
          <h1 className={cn(css({fontWeight: "bold", color: "text.1"}),"text-3xl")}><StuffBranding /></h1>
        </Link>
        <Link href="/pricing" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          Pricing
        </Link>
        <Link href="/blog" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          Blog
        </Link>
      </Stack>
      <nav>
        <Stack direction="row" gap="xl" align="center">
          <ThemeBtn />
          <Link
            href="/auth/identify"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "font-semibold"
            )}
          >
            Login
          </Link>
          <Link
            href="/auth/init"
            className={cn(
              buttonVariants({ variant: "accent", size: "lg"}),
              css({ fontWeight: 'semibold' })
            )}
          >
            Get Stuff free
          </Link>
        </Stack>
      </nav>
    </Flex>
  </header>
);
