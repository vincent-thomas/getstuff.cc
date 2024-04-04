"use client";

import { api } from "@stuff/api-client/react";
import { cn } from "@stuff/components/utils";
import { Flex } from "@stuff/structure";
import { H1, H2, P } from "@stuff/typography";
import { Button } from "@stuff/ui/button";
import { Heading } from "@stuff/ui/title";
import { format } from "date-fns";
import { CheckIcon, PlusIcon, PuzzleIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "packages/components/lib/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@stuff/ui/drawer";
import { toast } from "sonner";
import { Card } from "src/app/(public)/_components/card";
import { ScrollArea } from "packages/components/lib/scroll-area";
import { stack } from "src/components/recipies";
import { hoverUnderline } from "./account-viewer.css";
import { Text2 } from "packages/ui/atoms";

const classNames =
	"border border-border px-4 py-3 rounded-md flex flex-col hover:bg-hover w-full";

export const Extensions = () => {
	const enabled = api.extensions.mailRelay.enabled.useQuery();
	const enableMutation = api.extensions.mailRelay.enable.useMutation();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button
					className={cn(
						stack({ align: "center", gap: "md" }),
						css({ color: "text2", p: "medium" }),
						hoverUnderline,
					)}
				>
					<PuzzleIcon size={24} />
					<Text2
						className={css({
							fontWeight: "semibold",
						})}
					>
						Extensions
					</Text2>
				</button>
			</DialogTrigger>
			<DialogContent className="flex flex-col">
				<Flex justify="start" align="center" gap="1rem">
					<PuzzleIcon size={30} />
					<H1>Extensions</H1>
				</Flex>
				{enabled.data === false ? (
					<div className={cn(classNames)}>
						<H2>Mail relay</H2>
						<P>Mail relay is a nice feature</P>
						<Flex justify="end">
							<Button
								onClick={async () => {
									await enableMutation.mutateAsync();
									await enabled.refetch();
								}}
							>
								Enable
							</Button>
						</Flex>
					</div>
				) : (
					<EnabledMailRelayButton />
				)}
				<div className={cn(classNames)}>
					<H2>Folder rules</H2>
					<P>Redirect email elsewhere than inbox based on rules.</P>
					<Flex justify="end">
						<Button>Enable</Button>
					</Flex>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export const EnabledMailRelayButton = () => {
	const { data: aliases } = api.extensions.mailRelay.listAliases.useQuery();
	// const deleteRelayMutation = api.extensions.mailRelay.removeAlias.useMutation();
	const createAliasMutation =
		api.extensions.mailRelay.createAlias.useMutation();

	return (
		<Drawer>
			<DrawerTrigger className={classNames}>
				<Flex col className="text-left w-full">
					<H2>Mail relay</H2>
					<P>Mail relay is a nice feature</P>
					<Flex
						className="text-text2"
						align="center"
						justify="end"
						gap="0.3rem"
					>
						<i>enabled</i>
						<CheckIcon size={16} />
					</Flex>
				</Flex>
			</DrawerTrigger>
			<DrawerContent asChild>
				<div
					style={{
						maxWidth: "800px",
						maxHeight: "800px",
						display: "grid",
						gridTemplateRows: "auto auto 1fr auto",
					}}
					className={cn(stack({ direction: "col", gap: "md" }))}
				>
					<div className={stack({ justify: "between", direction: "row" })}>
						<H1>Mail relays</H1>
						<Button
							variant="ghost"
							rounded="medium"
							className={css({ p: "small" })}
							onClick={() => {
								createAliasMutation.mutate({ label: "google.com" });
							}}
						>
							<PlusIcon size={24} />
						</Button>
					</div>
					<input
						style={{ borderWidth: "1px" }}
						placeholder="Search..."
						className={css({
							p: "medium",
							bg: "bgSubtle",
						})}
					/>
					{aliases === undefined ? (
						<div className="grow"></div>
					) : aliases?.length === 0 ? (
						<Flex justify="center" align="center" className="grow">
							<H2 className="text-text2">You have no relays</H2>
						</Flex>
					) : (
						<ScrollArea className="h-full">
							<div className={stack({ direction: "col" })}>
								{aliases.map((alias) => (
									<Dialog key={alias.sk}>
										<DialogTrigger asChild>
											<Button variant="ghost" size="md" rounded="medium">
												<Card p="medium" className="text-left">
													<Heading weight="bold" className="text-lg">
														{alias.label}
													</Heading>
													<P>{alias.sk.split("|")[1]}@getstuff.cc</P>
												</Card>
											</Button>
										</DialogTrigger>
										<DialogContent>
											<div
												className={stack({
													align: "center",
													gap: "md",
													direction: "col",
												})}
											>
												<img
													width={50}
													height={50}
													src={`https://www.gentlentapis.com/tools/v1/getFavicon?url=https://${alias.label}&format=image`}
												/>
												<Heading weight="bold" className="text-2xl">
													{alias.label}
												</Heading>
												<P>
													Created at {format(alias.created_at, "dd MMMM, yyyy")}
												</P>
												<div
													className={cn(
														stack({ direction: "row", align: "center" }),
														css({ marginTop: "medium" }),
													)}
												>
													<Button variant="outline" size="md">
														Disable address
													</Button>
													<Button
														variant="primary"
														size="md"
														onClick={async () => {
															await navigator.clipboard.writeText(
																alias.sk.split("|")[1] + "@getstuff.cc",
															);
															toast.info("Address copied to clipboard");
														}}
													>
														Copy address
													</Button>
												</div>
											</div>
										</DialogContent>
									</Dialog>
								))}
							</div>
						</ScrollArea>
					)}
					<DrawerClose asChild>
						<Button
							variant="outline"
							size="lg"
							className={css({ marginTop: "auto" })}
						>
							Close
						</Button>
					</DrawerClose>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
