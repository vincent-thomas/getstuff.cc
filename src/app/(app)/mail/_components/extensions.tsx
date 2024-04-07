"use client";

import { api } from "@stuff/api-client/react";
import { cn } from "@stuff/components/utils";
import { Flex } from "@stuff/structure";
import { H2, P } from "@stuff/typography";
import { Button } from "@stuff/ui/button";
import { PuzzleIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "packages/ui/components/dialog/dialog";

import { hoverUnderline } from "./account-viewer.css";
import { Text2 } from "packages/ui/atoms";
import { stack } from "packages/ui/patterns/stack";
import { border } from "src/components/recipies";

const classNames = cn(
	css({ p: "medium", bg: { hover: "bgHover" }, width: "full" }),
	stack({ gap: "sm", direction: "col" }),
	border({ color: "interactive", side: "all", rounded: "radius" }),
);

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
			<DialogContent
				className={stack({ direction: "col" })}
				size="lg"
				mainTitle={
					<span className={stack({ gap: "md", align: "center" })}>
						<PuzzleIcon size={24} />
						Extensions
					</span>
				}
			>
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
	// const { data: aliases } = api.extensions.mailRelay.listAliases.useQuery();
	// const deleteRelayMutation = api.extensions.mailRelay.removeAlias.useMutation();
	// const createAliasMutation =
	// 	api.extensions.mailRelay.createAlias.useMutation();

	return (
		// <Drawer>
		// 	<DrawerTrigger className={classNames}>
		// 		<div
		// 			style={{ width: "100%" }}
		// 			className={cn(
		// 				stack({ direction: "col" }),
		// 				css({ textAlign: "left" }),
		// 			)}
		// 		>
		// 			<H2>Mail relay</H2>
		// 			<P>Mail relay is a nice feature</P>
		// 			<P
		// 				className={cn(
		// 					stack({ align: "center", justify: "end", gap: "md" }),
		// 				)}
		// 			>
		// 				<i>enabled</i>
		// 				<CheckIcon size={16} />
		// 			</P>
		// 		</div>
		// 	</DrawerTrigger>
		// 	<DrawerContent asChild>
		// 		<div
		// 			style={{
		// 				maxWidth: "800px",
		// 				maxHeight: "800px",
		// 				display: "grid",
		// 				gridTemplateRows: "auto auto 1fr auto",
		// 			}}
		// 			className={cn(stack({ direction: "col", gap: "md" }))}
		// 		>
		// 			<div className={stack({ justify: "between", direction: "row" })}>
		// 				<H1>Mail relays</H1>
		// 				<Button
		// 					variant="ghost"
		// 					rounded="medium"
		// 					className={css({ p: "small" })}
		// 					onClick={() => {
		// 						createAliasMutation.mutate({ label: "google.com" });
		// 					}}
		// 				>
		// 					<PlusIcon size={24} />
		// 				</Button>
		// 			</div>
		// 			<input
		// 				style={{ borderWidth: "1px" }}
		// 				placeholder="Search..."
		// 				className={css({
		// 					p: "medium",
		// 					bg: "bgSubtle",
		// 				})}
		// 			/>
		// 			{aliases === undefined ? (
		// 				<div className="grow"></div>
		// 			) : aliases?.length === 0 ? (
		// 				<Flex justify="center" align="center" className="grow">
		// 					<H2 className="text-text2">You have no relays</H2>
		// 				</Flex>
		// 			) : (
		// 				<div className={cn(css({ overflowY: "auto" }))}>
		// 					<div className={stack({ direction: "col" })}>
		// 						{aliases.map((alias) => (
		// 							<Dialog key={alias.sk}>
		// 								<DialogTrigger asChild>
		// 									<Button variant="ghost" size="md" rounded="medium">
		// 										<Card p="medium" className="text-left">
		// 											<Heading weight="bold" className="text-lg">
		// 												{alias.label}
		// 											</Heading>
		// 											<P>{alias.sk.split("|")[1]}@getstuff.cc</P>
		// 										</Card>
		// 									</Button>
		// 								</DialogTrigger>
		// 								<DialogContent size="lg">
		// 									<div
		// 										className={stack({
		// 											align: "center",
		// 											gap: "md",
		// 											direction: "col",
		// 										})}
		// 									>
		// 										<Image
		// 											width={50}
		// 											height={50}
		// 											alt="Website favicon"
		// 											src={`https://www.gentlentapis.com/tools/v1/getFavicon?url=https://${alias.label}&format=image`}
		// 										/>
		// 										<Heading weight="bold" className="text-2xl">
		// 											{alias.label}
		// 										</Heading>
		// 										<P>
		// 											Created at {format(alias.created_at, "dd MMMM, yyyy")}
		// 										</P>
		// 										<div
		// 											className={cn(
		// 												stack({ direction: "row", align: "center" }),
		// 												css({ marginTop: "medium" }),
		// 											)}
		// 										>
		// 											<Button variant="outline" size="md">
		// 												Disable address
		// 											</Button>
		// 											<Button
		// 												variant="primary"
		// 												size="md"
		// 												onClick={async () => {
		// 													await navigator.clipboard.writeText(
		// 														alias.sk.split("|")[1] + "@getstuff.cc",
		// 													);
		// 													toast.info("Address copied to clipboard");
		// 												}}
		// 											>
		// 												Copy address
		// 											</Button>
		// 										</div>
		// 									</div>
		// 								</DialogContent>
		// 							</Dialog>
		// 						))}
		// 					</div>
		// 				</div>
		// 			)}
		// 			<DrawerClose asChild>
		// 				<Button
		// 					variant="outline"
		// 					size="lg"
		// 					className={css({ marginTop: "auto" })}
		// 				>
		// 					Close
		// 				</Button>
		// 			</DrawerClose>
		// 		</div>
		// 	</DrawerContent>
		// </Drawer>
		<></>
	);
};
