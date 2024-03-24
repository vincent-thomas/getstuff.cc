import { Flex } from "@stuff/structure";
import { buttonVariants } from "@stuff/ui/button/variants";
import Link from "next/link";
import { cn } from "packages/components/utils";

export const Navbar = () => (
  <header>
    <Flex className="p-3" justify="between" align="center">
      <Flex gap="1rem" align="center">
        <Link href="/" className={buttonVariants({variant: "ghost"})}>
          <h1 className={cn("text-lg font-semibold text-text")}>Stuff Mail</h1>
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
