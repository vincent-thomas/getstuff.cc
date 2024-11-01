import { setupPage } from "@stuff/client/utils";
import { cn } from "@stuff/components/utils";
import { H1, H2, P } from "@stuff/typography";
import { button } from "@stuff/ui/button/button.css";
import { Logo } from "src/components/logo";
import { border, stack } from "src/components/recipies";
import { shadow } from "src/components/recipies/shadow.css";
import { Card } from "../../(public)/_components/card";
import { HeroTitle } from "../../(public)/_components/header";
import { Section } from "../../(public)/_components/section";
import { StuffBranding } from "../../(public)/_components/stuff";
import {
  boxGrid,
  conversations,
  extensions,
  folders,
  imageRotate,
} from "./page.css";
import Layout from "../../(public)/layout";

import Image from "next/image";
import { Text1 } from "packages/ui/atoms";
import { Disclosure } from "packages/ui/components/disclosure";
import { Link } from "src/components/structure/link";
import { NiceCard } from "../../(public)/_components/nicecard";

export default setupPage({
  Component() {
    return (
      <Layout>
        <div className={cn(stack({ gap: "xl", direction: "col" }))}>
          <div
            className={css({ position: "absolute" })}
            style={{
              top: 0,
              left: 0,
              right: 0,
              height: "420px",
              opacity: 0.15,
              background: `linear-gradient(to bottom, ${palette.solid1}, transparent)`,
              zIndex: -1,
            }}
          />
          <div
            className={css({ position: "fixed" })}
            style={{
              left: 0,
              bottom: 0,
              right: 0,
              height: "80px",
              opacity: 0.1,
              background: `linear-gradient(to top, ${palette.solid1}, transparent)`,
              zIndex: -1,
            }}
          />
          <Section
            maxWidth="md"
            className={css({ p: "medium", paddingBottom: "none" })}
          >
            <div
              style={{ width: "100%" }}
              className={cn(
                stack({
                  justify: "start",
                  align: "center",
                  direction: {
                    mobile: "col",
                    desktop: "row",
                  },
                }),
              )}
            >
              <HeroTitle
                className="pt-8 animate-in ease-out slide-in-from-left-10 duration-700 fade-in max-md:text-center"
                title={
                  <>
                    Empower your inbox with{" "}
                    <span
                      style={{ width: "auto" }}
                      className={cn(
                        stack({ direction: "row", gap: "md", align: "center" }),
                      )}
                    >
                      <Logo color size={57.5} />
                      <StuffBranding />
                    </span>
                  </>
                }
                comment="Stuff mail for the productive"
                under={
                  <Link
                    href="/auth/init"
                    className={cn(
                      button({
                        variant: "accent",
                        size: "lg",
                        rounded: "medium",
                      }),
                    )}
                  >
                    Get Stuff free
                  </Link>
                }
              />
            </div>
          </Section>
          <Section
            maxWidth="md"
            className={stack({
              direction: { mobile: "col", desktop: "row" },
              gap: "md",
            })}
          >
            <NiceCard
              title="Privacy"
              desc="Stuff is end-to-end encrypted which means we cant even read your emails"
              href="#"
            />
            <NiceCard
              title="Security"
              desc="Your account stays with us. We have extensive security measures."
              href="#"
            />
            <NiceCard
              title="Feature rich"
              desc="With Stuff extensions more and more features are being added every week"
              href="#features"
            />
          </Section>
          <Section
            maxWidth="lg"
            className={cn(
              css({ bg: "bgSubtle", mX: "auto", width: "full" }),
              border({ color: "subtle", rounded: "xl", side: "all" }),
            )}
          >
            <Section
              maxWidth="md"
              className={cn(
                stack({ direction: "col", align: "start" }),
                css({ pY: "2xlarge" }),
              )}
            >
              <Text1 className={css({ fontSize: "medium" })}>
                Stuff is a mail service
              </Text1>
              <H1 id="features" className={css({ fontSize: "xlarge" })}>
                Stuff Features
              </H1>
              <div className={boxGrid}>
                <Card
                  className={cn(
                    conversations,
                    stack({ direction: "col" }),
                    css({ p: "xlarge", bg: "bgApp", overflow: "visible" }),
                  )}
                >
                  <H2 className={css({ fontSize: "large" })}>
                    Seamless Conversations
                  </H2>
                  <P style={{ maxWidth: "35ch", textWrap: "wrap" }}>
                    In Stuff mail you can have conversations with other email
                    users.
                  </P>
                  <Image
                    width={704}
                    height={553}
                    src="/conversationv2.webp"
                    loading="lazy"
                    alt="Conversations example from Stuff mail"
                    style={{ aspectRatio: 1 }}
                    className={cn(
                      shadow({ size: "large" }),
                      border({ rounded: "xl", color: "focus", side: "all" }),
                      css({ marginLeft: "auto", marginTop: "medium" }),
                      imageRotate,
                      // "mt-4 md:w-[80%] w-full ml-auto mr-2 border-border border",
                    )}
                  />
                </Card>
                <Card
                  className={cn(
                    folders,
                    shadow({ size: "large" }),
                    css({ p: "xlarge", bg: "bgApp" }),
                  )}
                >
                  <P>Extension:</P>
                  <H2 className={css({ fontSize: "large" })}>Folder Rules</H2>
                  <P className="max-w-[30ch] text-wrap">
                    With folder rules you can customise where and how your
                    emails are recieved. You can configure forwarding,
                    archiving, moving of mails when recieved.
                  </P>
                  <Link href="#" className={button({ variant: "link" })}>
                    Learn more
                  </Link>
                </Card>
                <Link
                  href="/extensions"
                  style={{ outlineColor: palette.borderFocus }}
                  className={cn(
                    extensions,
                    shadow({ size: "large" }),
                    css({ bg: "bgApp" }),

                    css({ bg: { hover: "bgHover" } }),
                    stack({ direction: "col" }),
                  )}
                >
                  <Card className={cn()}>
                    <div
                      className={cn(
                        stack({ direction: "col" }),
                        css({ p: "xlarge" }),
                      )}
                    >
                      <H2 className={css({ fontSize: "large" })}>Extensions</H2>
                      <Text1>
                        With Stuff Extensions, behavior and features can be
                        added and highly customised to Stuff.
                      </Text1>
                    </div>
                    <div className={stack({ justify: "end" })}>
                      <Image
                        src="/extensions.webp"
                        alt="Available extensions"
                        loading="lazy"
                        width="456"
                        height="420"
                        className={cn(css({ marginLeft: "auto" }))}
                        style={{ width: "70%" }}
                      />
                    </div>
                  </Card>
                </Link>
              </div>
            </Section>
            <Disclosure.Root>
              <Disclosure.Trigger>testing</Disclosure.Trigger>
              <Disclosure.Content>testing</Disclosure.Content>
            </Disclosure.Root>
          </Section>
        </div>
      </Layout>
    );
  },
});
