import Link from "next/link";
import { Flex } from "packages/components/lib/flex";
import { buttonVariants } from "packages/components/lib/variants";
import { cn } from "packages/components/utils";

export const Navbar = () => (
  <header>
    <Flex className="p-3" justify="between" align="center">
      <Link href="/?stay=1" className="rounded-md px-3 py-2 hover:bg-muted">
        <h1 className={cn("text-lg font-semibold text-primary")}>Stuff Mail</h1>
      </Link>
      <nav>
        <Flex gap="1rem" align="center" justify="between">
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
          <Link href="/pricing" className={buttonVariants({ variant: "link" })}>
            Pricing
          </Link>
          <Link
            href="/mail/inbox"
            className={cn(
              buttonVariants({ variant: "default" }),
              "font-semibold"
            )}
          >
            Login
          </Link>
        </Flex>
      </nav>
    </Flex>
  </header>
);
