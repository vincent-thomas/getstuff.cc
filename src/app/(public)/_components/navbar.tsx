import { Flex } from "@stuff/structure";
import { buttonVariants } from "@stuff/ui/button/variants";
import Link from "next/link";
import { cn } from "packages/components/utils";
import { Logo } from "src/components/logo";
import { StuffBranding } from "./stuff";

export const Navbar = () => (
  <header className="animate-in slide-in-from-top-2 duration-700 fade-in">
    <Flex className="p-3" justify="between" align="center">
      <Flex gap="1rem" align="center">
        <Link href="/" className={buttonVariants({variant: "ghost"})}>
          <Logo size={24} color />
          <h1 className={cn("text-3xl font-bold text-text")}><StuffBranding /></h1>
        </Link>
        <Link href="/pricing" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          Pricing
        </Link>
        <Link href="/blog" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          Blog
        </Link>
      </Flex>
      <nav>
        <Flex gap="1rem" align="center" justify="between">

          <Link
            href="/auth/identify"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "font-semibold"
            )}
          >
            Login
          </Link>
          <Link
            href="/auth/init"
            className={cn(
              buttonVariants({ variant: "accent", size: "lg"}),
              "font-semibold"
            )}
          >
            Get Stuff free
          </Link>
        </Flex>
      </nav>
    </Flex>
  </header>
);
