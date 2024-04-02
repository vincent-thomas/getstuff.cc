import Link from "next/link";
import { Section } from "./_components/section";
import { Card } from "./_components/card";
import { HeroTitle } from "./_components/header";
import { cn } from "@stuff/components/utils";
import { setupPage } from "@stuff/client/utils";
import { button } from "@stuff/ui/button/button.css";
import { StuffBranding } from "./_components/stuff";
import { H1, H2, P } from "@stuff/typography";
import { Flex } from "@stuff/structure";
import "./style.css";
import { boxGrid, conversations, extensions, folders } from "./page.css";
import { Logo } from "src/components/logo";
import { Footer } from "./_components/footer";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@stuff/ui/accortion";
import { border, stack } from "src/components/recipies";
import { shadow } from "src/components/recipies/shadow.css";

import { NiceCard } from "./_components/nicecard";
import { HeaderIcon } from "./page.icon";
import { Text2 } from "packages/ui/atoms";

export default setupPage({
	async Component() {
		return (
			<div className={stack({ gap: "xl", direction: "col" })}>
				<Section
					maxWidth="md"
					className={css({ p: "medium", paddingBottom: "none" })}
				>
					<div
						style={{ width: "100%" }}
						className={cn(
							stack({
								justify: "between",
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
						<HeaderIcon />
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
						css({ bg: "bg2", mX: "auto", width: "full" }),
						border({ rounded: "xl" }),
					)}
				>
					<Section
						maxWidth="md"
						className={cn(
							stack({ direction: "col", align: "start" }),
							css({ overflow: "hidden", pY: "2xlarge" }),
						)}
					>
						<Text2 className={css({ fontSize: "medium" })}>
							Stuff is a mail service
						</Text2>
						<H1 id="features" className={css({ fontSize: "xlarge" })}>
							Stuff Features
						</H1>
						<div className={boxGrid}>
							<Card
								className={cn(
									conversations,
									shadow({ size: "large" }),
									css({ p: "xlarge", bg: "bg" }),
								)}
							>
								<H2 className={css({ fontSize: "large" })}>Conversations</H2>
								<P style={{ maxWidth: "35ch", textWrap: "wrap" }}>
									In Stuff mail you can have conversations with other email
									users.
								</P>
								<img
									src="/conversationv2.webp"
									alt="Conversations example from Stuff mail"
									className="rounded-xl shadow-xl mt-4 md:skew-y-[-12deg] md:rotate-[8deg] md:w-[80%] w-full ml-auto mr-2 aspect-square border-border border"
								/>
							</Card>
							<Card
								className={cn(
									folders,
									shadow({ size: "large" }),
									css({ p: "xlarge", bg: "bg" }),
								)}
							>
								<P>Extension:</P>
								<H2 className={css({ fontSize: "large" })}>Folder Rules</H2>
								<P className="max-w-[30ch] text-wrap">
									With folder rules you can customise where and how your emails
									are recieved. You can configure forwarding, archiving, moving
									of mails when recieved.
								</P>
								<Link href="#" className={button({ variant: "link" })}>
									Learn more
								</Link>
							</Card>
							<Card
								className={cn(
									extensions,
									shadow({ size: "large" }),
									css({ bg: "bg" }),
								)}
							>
								<Link
									href="/extensions"
									className={cn(
										css({ bg: { hover: "hover" } }),
										stack({ direction: "col" }),
									)}
								>
									<div
										className={cn(
											stack({ direction: "col" }),
											css({ p: "xlarge" }),
										)}
									>
										<H2 className={css({ fontSize: "large" })}>Extensions</H2>
										<Text2>
											With Stuff Extensions, behavior and features can be added
											and highly customised to Stuff.
										</Text2>
									</div>
									<div className={stack({ justify: "end" })}>
										<img
											src="/extensions.webp"
											alt="Available extensions"
											className={cn(css({ marginLeft: "auto" }))}
											style={{ width: "70%" }}
										/>
									</div>
								</Link>
							</Card>
						</div>
						<div className="py-16"></div>
						<h2 className="text-4xl font-bold pb-10">
							Guarranties by <StuffBranding />:
						</h2>
						<div className="grid grid-cols-2 gap-6">
							<Card p="medium">
								<h1 className="text-3xl font-semibold">Most Secure Mail</h1>
								<p className="max-w-[50ch]">
									We keep your account safe to the extreme with protocols such
									as SRP (secure remote password)
								</p>
								<Link
									href="#"
									className={cn(
										"ml-auto block font-semibold",
										button({ variant: "link" }),
									)}
								>
									Learn more
								</Link>
							</Card>
							<Card p="medium">
								<h1 className="text-3xl font-semibold">Private</h1>
								<p className="max-w-[50ch]">
									All your user information and emails are end-to-end encrypted
									and is only viewable by you, we can&apos;t even see it.
								</p>
								<Link
									href="#"
									className={cn(
										"ml-auto block font-semibold",
										button({ variant: "link" }),
									)}
								>
									Learn more
								</Link>
							</Card>
							<Card p="medium">
								<h1 className="text-3xl font-semibold">Polished</h1>
								<p className="max-w-[50ch]">
									With its polished user experience, you can be sure to get the
									most out of a mail service
								</p>
							</Card>
						</div>
					</Section>
				</Section>
				<Section maxWidth="xs">
					<H2>FAQ</H2>
					<Accordion type="multiple">
						<AccordionItem value="item-1">
							<AccordionTrigger>Is Stuff mail free?</AccordionTrigger>
							<AccordionContent>
								Yes Stuff mail has a free tier that gets you going
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>How secure is stuff mail?</AccordionTrigger>
							<AccordionContent>
								Stuff mails design is to be secure and private. We use
								end-to-end encryption to keep your emails safe. This means that
								its impossible for us as service owners to read your messages.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</Section>
				<div className="mb-24">
					<Footer />
				</div>
			</div>
		);
	},
});
