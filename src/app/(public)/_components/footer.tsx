import { Flex } from "@stuff/structure"
import { Section } from "./section"
import Link from "next/link"
import { button } from "@stuff/ui/button/button.css"
import { cn } from "@stuff/components/utils"

export const Footer = () => {
 return (
   <footer className="bottom-0 relative w-full">
     {/* <Section className="flex flex-col items-start gap-6 !p-0" maxWidth="xs">
       <Flex col gap="1rem" align="start">
         <h2 className="text-4xl font-bold">Want to try?</h2>
         <h3 className="text-2xl font-bold">Start a free trial here:</h3>
         <Button size="lg">Start trail</Button>
       </Flex>
     
     </Section> */}
     <Section maxWidth="lg">
        <Flex className="w-full flex" justify="between">
         <Flex align="center" gap="0.5rem" className="max-sm:hidden">
           <p>Stuff © {new Date().getFullYear()}</p><span>•</span>
           <a href="https://github.com/vincent-thomas" target="_blank" className={cn("!pl-0",button({variant: "link", size: "sm"}))}>Vincent Thomas</a>
         </Flex>
         <Flex gap="1rem">
           <Link
             href="/cookies"
             className={button({ variant: "link" })}
           >
             Cookies
           </Link>
           <Link
             href="/privacy-policy"
             className={button({ variant: "link" })}
           >
             Privacy policy
           </Link>
         </Flex>
       </Flex>
     </Section>
 </footer>
 )
}