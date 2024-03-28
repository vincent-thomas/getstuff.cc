
import { Flex } from "@stuff/structure";
import { Button } from "@stuff/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";

export const CookieTeller = () => {

  const hasDoneIt = cookies().get("agnolished-cookies")?.value ?? null;

  if (hasDoneIt === "true") {
    return null;
  }

  const test = async () => {
    "use server";

    cookies().set("agnolished-cookies", "true", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })
  }

  return (
    <Flex className="p-4 bg-background2 sticky border-b border-border" gap="2rem" align="center">
      <span>
        Stuff Mail use cookies only to make sure you are you. Please click here to accept our cookies policy.
        {" "}<Link href="/cookies" className="underline">Read more here</Link>.
      </span>
      <form action={test}>
        <Button>Accept</Button>
      </form>

    </Flex>
  )
}