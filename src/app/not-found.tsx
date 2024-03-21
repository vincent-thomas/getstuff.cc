import { cn } from "@stuff/components/utils";
import { Flex } from "@stuff/structure";
import { H1, H2, P } from "@stuff/typography";
import { buttonVariants } from "@stuff/ui/button/variants";
import Link from "next/link";

const Page = () =>{
  return (
    <div className="bg-background flex justify-center items-center w-full h-screen">
      <Flex col align="start">
        <H1 className="text-muted-foreground">Stuff Mail 404</H1>
        <H2>Page or resouce not found</H2>
        <P>This page doesn't seem to exist, or maybe you don't have access to it?</P>
        <Link href="/mail/inbox" className={cn("mt-4",buttonVariants({variant: "outline", size: "lg"}))}>Go to inbox</Link>
      </Flex>
      </div>
  )
}

export default Page;