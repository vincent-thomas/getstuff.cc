import Link from "next/link";
import { Section } from "./_components/section";
import { Card } from "./_components/card";
import { HeroTitle,  } from "./_components/header";
import { cn } from "@stuff/components/utils"
import { setupPage } from "@stuff/client/utils";
import { buttonVariants } from "@stuff/ui/button/variants";
import { StuffBranding } from "./_components/stuff";
import { H1, H2, P } from "@stuff/typography";
import { Flex } from "@stuff/structure";
import "./style.css"
import { Button } from "@stuff/ui/button";
import { boxGrid, conversations, extensions, folders } from "./page.css";
import { Logo } from "src/components/logo";
import { Footer } from "./_components/footer";


export default setupPage({
  async Component() {
    return (
      <>
        <Section className="flex justify-between items-center md:pt-20 max-md:flex-col max-md:items-center w-full">
          <HeroTitle
            className="pt-8 animate-in ease-out slide-in-from-left-10 duration-700 fade-in max-md:text-center "
            title={<>
              Empower your inbox with{" "}
              <span className="inline-flex items-center gap-2 w-auto">
                <Logo color size={57.5} />
                <StuffBranding />
              </span>
            </>}
            comment="Stuff mail for the productive"
            under={
              <Flex justify="start" className="max-md:justify-center">
                <Link href="/auth/init" className={cn(buttonVariants({variant: "accent",size: "lg"}))}>Get Stuff free</Link>
              </Flex>
            }
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="animate-in ease-out slide-in-from-right-10 duration-700 fade-in max-w-[400px]"><title>React</title><defs><linearGradient id="linear-gradient" x1="-578.68" y1="1417.05" x2="-580.46" y2="1572.85" gradientTransform="translate(849 1803.66) scale(1 -1)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#231f20" stopOpacity="0" style={{stopColor: "rgb(77, 77, 77)"}}></stop><stop offset="1" stopColor="#231f20" style={{stopColor: "rgb(35, 31, 32)"}}></stop></linearGradient><linearGradient id="linear-gradient-2" x1="-669.83" y1="1572.66" x2="-617.6" y2="1572.66" ></linearGradient><linearGradient id="linear-gradient-3" x1="-558.64" y1="1610.17" x2="-568.11" y2="1449.09" gradientTransform="translate(836.78 1793.46) scale(1 -1)"></linearGradient><linearGradient id="linear-gradient-4" x1="-669.57" y1="1545.12" x2="-668.38" y2="1524.97" ></linearGradient></defs><g id="background"><path className="cls-5" d="M493.66,354.55c-.25,2.6-.71,5.18-1.38,7.7-1.55,5.83-3.89,11.43-6.96,16.63-17.77,30.99-52.57,48.93-87.58,56.26-35.02,7.32-71.17,5.73-106.89,7.37-48.25,2.19-96.38,10.28-144.64,7.63-22.88-1.27-45.55-4.94-67.66-10.96-106.57,0-54.47-162.75-48.34-224.45,2.66-26.56,5.74-54.44,20.9-76.43,17.95-26,49.72-38.96,80.81-44.62,31.09-5.67,63.07-5.31,93.99-11.84,50.47-10.62,99.33-39.2,150.28-31.05,49.98,7.97,90.54,55.58,90.51,106.19,0,35.53-16.12,70.83-6.87,106.25,8.05,30.71,36.92,57.91,33.82,91.34Z"></path><path className="cls-5" d="M492.28,362.25c-1.55,5.83-3.89,11.43-6.96,16.63-17.77,30.99-52.57,48.93-87.58,56.26-35.02,7.32-71.17,5.73-106.89,7.37-48.25,2.19-96.38,10.28-144.64,7.63-22.88-1.27-45.55-4.94-67.66-10.96-14.81-4.04-45.42-9.3-54.38-23.02-5.6-8.56-6.53-24.6-6.71-38.12,3.36.53,6.68,1.33,9.61,1.6,9.92.96,19.96,1.02,29.9,1.33,21.06.67,42.14,1.12,63.23,1.35,83.95.89,167.83-1.87,251.65-8.29,40.21-3.09,80.36-7.02,120.44-11.78Z"></path><path className="cls-5" d="M206.94,392.91c-13.79,2.46-27.45,5.66-41.41,7-9.05.89-19.04,1.34-25.61,7.63-1.56,1.33-2.59,3.18-2.91,5.21-.38,4.36,4.18,7.39,8.24,9,11.87,4.69,24.79,6.04,37.52,6.85,20.76,1.32,41.61,1.34,62.38,1.35l61.98.06c18.29,0,38.6-.74,51.71-13.51,2.59-2.52,4.88-5.64,5.31-9.23.73-5.83-3.69-11.3-9.03-13.73-9.24-4.22-23.07-3.35-33.15-4.43-13.09-1.45-26.27-2.25-39.44-2.41-25.33-.31-50.64,1.77-75.58,6.21Z"></path></g><g id="inbox"><rect className="cls-7" x="257.86" y="259.6" width="23.69" height="146.11"></rect><rect className="cls-1" x="257.86" y="259.6" width="23.69" height="146.11"></rect><path className="cls-7" d="M337.25,214.73v57.9h-162.33v-57.9c.04-16.65,13.56-30.13,30.22-30.1h101.91c16.64,0,30.16,13.46,30.21,30.1Z"></path><path className="cls-3" d="M205.26,189.62h0c14.43,0,26.14,11.69,26.15,26.13,0,.01,0,.03,0,.04v56.58h-52.24v-56.58c-.02-14.43,11.66-26.15,26.09-26.17Z"></path><path className="cls-4" d="M337.26,214.73v57.9h-100.05v-61.28c-2.98-16.02-14.25-23.37-23.52-26.77h93.36c16.66,0,30.18,13.48,30.21,30.14Z"></path><rect className="cls-7" x="122.8" y="264.34" width="114.44" height="8.31" rx="4.15" ry="4.15"></rect><rect className="cls-2" x="122.8" y="264.34" width="114.44" height="8.31" rx="4.15" ry="4.15"></rect><path className="cls-7" d="M293.61,223.64c-.22.73-.89,2.99-1.07,3.8l-2.21,8.2c-.1.36-.15.73-.15,1.11,0,.49.39.89.88.89.03,0,.06,0,.08,0,.86-.07,1.67-.4,2.33-.97,1.77-1.4,2.98-4.13,2.98-6.98.08-3.23-1.53-6.26-4.24-8.01-2.03-1.09-4.31-1.63-6.61-1.55-7.79,0-13.28,5.16-13.28,12.48s4.91,11.75,12.33,11.75c1.91,0,3.81-.27,5.65-.81,1.46-.45,2.86-1.11,4.13-1.96l2.26,3.25c-1.43.94-2.98,1.66-4.62,2.14-2.53.79-5.17,1.19-7.83,1.19-5.21,0-9.27-1.48-12.19-4.43-2.81-2.91-4.34-6.81-4.26-10.85-.11-4.29,1.51-8.43,4.5-11.51,3.4-3.4,7.87-5.06,13.59-5.06,8.61,0,14.74,5.54,14.74,13.28.05,3.32-1.22,6.52-3.54,8.9-1.81,1.88-4.3,2.97-6.91,3.03-1.23.09-2.43-.45-3.18-1.43-.2-.35-.31-.75-.34-1.15-1.18,1.53-3.02,2.39-4.95,2.33-3.66,0-5.99-2.74-5.99-6.94,0-6.2,4.11-11.41,9.01-11.41,2.07,0,3.11.51,4.1,2.07l.37-1.29,4.4-.04ZM286.01,234.61c.9-1.77,1.4-3.71,1.48-5.69,0-1.51-.89-2.55-2.14-2.55s-2.7.93-3.62,2.66c-.9,1.71-1.41,3.6-1.48,5.53,0,1.96.74,2.99,2.14,2.99s2.66-1.06,3.62-2.94Z"></path></g><g id="wind"><path className="cls-6" d="M186.82,223.27c-15.47,0-30.46-4.69-42.1-13.34-3.03-2.21-5.75-4.81-8.11-7.73-4.43-.5-8.69-1.96-12.49-4.29-17.93-10.67-23.81-33.86-13.13-51.79,2.9-4.88,6.87-9.04,11.6-12.17l1.7,2.57c-15.98,10.57-20.35,32.1-9.78,48.07,2.88,4.35,6.7,7.99,11.19,10.66,2.65,1.6,5.53,2.76,8.55,3.44-1.78-2.99-2.83-6.37-3.06-9.85-.16-5.22,2.03-10.23,5.97-13.66,4.74-4.59,12.3-4.46,16.89.28.65.68,1.23,1.43,1.7,2.24,2.11,3.21,2.86,7.12,2.09,10.88-1.43,6.49-7.22,11.83-14.44,13.28-.88.18-1.76.3-2.66.36,1.79,1.91,3.75,3.65,5.85,5.21,13.14,9.74,30.78,14.24,48.37,12.28l.34,3.06c-2.81.32-5.64.48-8.47.48ZM138.24,199.22c1.52.04,3.03-.07,4.52-.35,5.94-1.2,10.88-5.68,12.03-10.91.58-2.96-.02-6.03-1.66-8.55-2.42-4.25-7.83-5.72-12.08-3.3-.69.39-1.32.88-1.88,1.44-3.23,2.79-5.03,6.88-4.91,11.15.3,3.81,1.68,7.47,3.98,10.53Z"></path><path className="cls-7" d="M135.59,127.62c1.34-4.33,4.19-8.05,8.02-10.47,4.83-2.98,10.77-3.44,16.43-3.82-1.51,1.22-2.49,2.97-2.74,4.9-.35,1.89-.31,3.84-.6,5.75-1.46,8.09-8.41,14.04-16.63,14.23-.75-4.06,2.13-7.81,4.84-10.93-3.18.94-5.57,3.57-6.2,6.83-.11,1.34-.3,2.67-.56,3.98-.25.82-1.35,2.82-2.49,2.39-.82-.31-.89-3.32-.98-4.07-.29-2.96.01-5.94.89-8.77Z"></path><path className="cls-7" d="M91.72,145.89c.08,2.18.38,4.36.89,6.48.51,2.13,1.65,4.07,3.26,5.56,1.13.79,2.21,1.65,3.24,2.56.06.08.14.15.24.18,1.02.27,2.01-3.78,1.99-4.48-.2-1.54-.75-3.01-1.6-4.3-1.65-3.09-4.58-5.29-8.01-5.99Z"></path></g></svg>
        </Section>
        <Section className="animate-in ease-out slide-in-from-bottom-10 duration-700 grid grid-cols-3 w-full max-w-[1000px] gap-space-lg max-md:grid-cols-1 max-md:grid-rows-3 md:pb-24">
          <Card p="md" className="animate-in ease-out duration-700 fade-in slide-in-from-left-10 flex flex-col justify-between">
            <div>
              <H2>Privacy</H2>
              <P className="max-w-[45ch]">Stuff is end-to-end encrypted which means we cant even read your emails</P>
            </div>
            <Button className="ml-auto mt-2" variant="link" size="md">Read more</Button>
          </Card>
          <Card p="md" className="animate-in ease-out duration-700 fade-in flex flex-col justify-between">
            <div>
            <H2>Security</H2>
            <P>Your account stays with us. We have extensive security measures.</P>
            </div>
            <Link href="/whitepaper" className={cn("ml-auto", buttonVariants({variant: "link"}))}>Whitepapers</Link>
          </Card>
          <Card p="md" className="animate-in ease-out duration-700 fade-in slide-in-from-right-10 flex flex-col justify-between">
            <div>
              <H2>Feature rich</H2>
              <P>With Stuff extensions more and more features are being added every week</P>
            </div>
            <a href="#features" className={cn("ml-auto", buttonVariants({variant: "link"}))}>Show features</a>
          </Card>
        </Section>
        <div className="animate-in ease-out slide-in-from-bottom-40 duration-700 fade-in bg-background2 border border-b-0 border-border rounded-t-[50px] border-border max-w-[1400px] w-full mx-auto relative">
          <Section highSpace className="flex flex-col items-center overflow-hidden">
            <P>Stuff is a mail service</P>
            <H1 id="features">Stuff Features</H1>
            <div className={boxGrid}>
              <Card className={cn(conversations, "bg-background w-full border-none p-8 shadow-lg")}>
                <H2>Conversations</H2>
                <P className="max-w-[30ch] text-wrap">
                  In Stuff mail you can have conversations with other email users.
                </P>
                <img src="/conversationv2.png" alt="Conversations example from Stuff mail" className="rounded-xl shadow-xl mt-4 md:skew-y-[-12deg] md:rotate-[8deg] md:w-[80%] w-full ml-auto mr-2 aspect-square border-border border" />
              </Card>
              <Card className={cn(folders,"shadow-lg bg-background border-none p-8")}>
                <P>Extension:</P>
                <H2>Folder Rules</H2>
                <P className="max-w-[30ch] text-wrap">
                  With folder rules you can customise where and how your emails are recieved. You can configure forwarding, archiving, moving of mails when recieved.
                </P>
                <Link
                  href="#"
                  className={cn(
                    "ml-auto block font-semibold",
                    buttonVariants({ variant: "link" })
                  )}
                >
                  Learn more
                </Link>
              </Card>
              <Card className={cn(extensions,"shadow-lg bg-background border-none hover:bg-card")}>
                <Link href="/extensions">
                  <Flex col className="p-8 pb-0">
                  <H2>Extensions</H2>
                  <P className="max-w-[50ch] text-wrap">
                    With Stuff Extensions, behavior and features can be added and highly customised to Stuff.
                  </P>
                  </Flex>
                  <img src="/extensions.png" alt="Available extensions" className="w-[70%] border-t border-l rounded-tl-lg border-border ml-auto mt-6" />
                </Link>
              </Card>
            </div>
            <div className="py-16"></div>
            <h2 className="text-4xl font-bold pb-10">Guarranties by <StuffBranding />:</h2>
            <div className="grid grid-cols-2 gap-6">
              <Card p="md">
                <h1 className="text-3xl font-semibold">Most Secure Mail</h1>
                <p className="max-w-[50ch]">
                  We keep your account safe to the extreme with protocols such
                  as SRP (secure remote password)
                </p>
                <Link
                  href="#"
                  className={cn(
                    "ml-auto block font-semibold",
                    buttonVariants({ variant: "link" })
                  )}
                >
                  Learn more
                </Link>
              </Card>
              <Card p="md">
                <h1 className="text-3xl font-semibold">Private</h1>
                <p className="max-w-[50ch]">
                  All your user information and emails are end-to-end encrypted
                  and is only viewable by you, we can&apos;t even see it.
                </p>
                <Link
                  href="#"
                  className={cn(
                    "ml-auto block font-semibold",
                    buttonVariants({ variant: "link" })
                  )}
                >
                  Learn more
                </Link>
              </Card>
              <Card p="md">
                <h1 className="text-3xl font-semibold">Polished</h1>
                <p className="max-w-[50ch]">
                  With its polished user experience, you can be sure to get the
                  most out of a mail service
                </p>
              </Card>
            </div>
            <div className="mt-20 w-full">
              <Footer />
            </div>
          </Section>
        </div>
      </>
    );
  }
});
