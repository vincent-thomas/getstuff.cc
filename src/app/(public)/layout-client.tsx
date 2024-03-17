import type { LayoutProps } from "@/types/router";
import { ScrollArea } from "packages/components/lib/scroll-area";
import { Navbar } from "./_components/navbar";
import { Section } from "./_components/section";
import { Button } from "packages/components/lib";
import { CookieTeller } from "../_components/cookie-teller";


export const SharedLayout = (props: LayoutProps) => (
  <ScrollArea className="h-screen">
    <CookieTeller />
    <Navbar />
    {props.children}
    <footer className="pb-6">
      <div className="my-6 w-full border-b border-border"></div>
      <Section className="flex flex-col items-start gap-4">
        <h2 className="text-4xl font-bold">Want to try?</h2>
        <h3 className="text-2xl font-bold">Start a free trial here:</h3>

        <Button size="lg">Start trail</Button>
      </Section>
    </footer>
  </ScrollArea>
)