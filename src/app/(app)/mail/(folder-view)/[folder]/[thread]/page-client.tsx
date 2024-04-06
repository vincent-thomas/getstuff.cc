"use client";

import { useEffect, useRef } from "react";
import { z } from "zod";
import { SelectedBar } from "../_components/selected-bar";
import { ArrowLeftCircleIcon, ShieldCheckIcon } from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import { decryptAsymmetric, decryptSymmetric } from "@stuff/lib/crypto";
import { useThreadQuery } from "@stuff/data-access/get-threads-query";
import { useThreadsReadMutation } from "@stuff/data-access/read-threads-mutation";
import { useDataKey } from "@stuff/lib/useUserPrivateKey";
import { Flex } from "@stuff/structure";
import { Tooltip, TooltipContent, TooltipTrigger } from "@stuff/ui/tooltip";
import { Button } from "@stuff/ui/button";
import { Loading } from "@stuff/icons/loading";
import purify from "dompurify";
import { threadOpen } from "../store/thread-open";
import { useAtom } from "jotai";
import { palette } from "packages/ui/theme";
import { border } from "src/components/recipies";

const paramsInterface = z.object({
	threadId: z.string(),
	folderId: z.string(),
});

export interface ProcessMessageInterface {
	messageId: string;
	subject: string;
	content: {
		text: string;
		html: string;
	};
	to: {
		address: string;
		name: string;
	}[];
	from: {
		address: string;
		name: string;
	};
}

const processMessage = async (
	message: ProcessMessageInterface,
	userKey: Buffer,
) => {
	const htmlContent = decryptSymmetric(message.content.html, userKey);
	const textContent = decryptSymmetric(message.content.text, userKey);

	return {
		messageId: message.messageId,
		content: {
			text: textContent,
			html: htmlContent,
		},
		subject: message.subject,
		from: message.from,
		to: message.to,
	};
};

const MainPage = ({ threadId, folderId }: z.infer<typeof paramsInterface>) => {
	const threadQuery = useThreadQuery({
		folderId,
		threadId,
	});
	const threadReadMutation = useThreadsReadMutation();
	const masterKey = useDataKey();

	const messages = useQueries({
		queries: (threadQuery.data?.messages ?? []).map((message) => ({
			queryKey: ["message", { messageId: message.messageId }],
			queryFn: async () => {
				const threadEncryptionKey = z
					.string()
					.parse(message.messageEncryptionKey);
				const content = await fetch(message.contentUrl, {
					cache: "force-cache",
				}).then(async (v) =>
					z
						.object({ html: z.string(), text: z.string() })
						.parse(await v.json()),
				);
				const userKey = decryptAsymmetric(
					threadEncryptionKey,
					z.string().parse(masterKey),
				);

				return processMessage(
					{
						content,
						messageId: message.messageId,
						subject: message.subject,
						to: message.to,
						from: message.from,
					},
					userKey,
				);
			},
		})),
	});

	useEffect(() => {
		if (threadQuery.data?.thread.read === false) {
			threadReadMutation.mutate({
				value: true,
				folderId,
				threadIds: [threadId],
			});
		}
	}, [folderId, threadId, threadQuery.data?.thread.read]);

	return (
		<>
			<div
				className={cn(
					stack({ align: "center", justify: "between", gap: "md" }),
					css({ p: "medium" }),
				)}
			>
				<h1 className="text-3xl text-text">{threadQuery.data?.thread.title}</h1>
				<div>
					<Tooltip>
						<TooltipTrigger className="rounded-full hover:bg-hover">
							<ShieldCheckIcon size={18} color={palette.text2} />
						</TooltipTrigger>
						<TooltipContent className="bg-background2 shadow-lg">
							<p className="text-sm text-text2">
								This thread is encrypted by Stuff, only you can read this
							</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div
				className={cn(
					stack({ direction: "col", gap: "md" }),
					css({ paddingBottom: "medium", pX: "medium" }),
				)}
			>
				{messages.map(({ data: mail }, index) => {
					if (mail === undefined) {
						return <Loading size={24} color="text-primary" key={index} />;
					}
					return (
						<div
							className={cn(
								stack({ direction: "col" }),
								border({
									rounded: "radius",
									color: "interactive",
									side: "all",
								}),
							)}
							key={mail.messageId}
						>
							<div
								style={{ gap: "1px" }}
								className={cn(
									stack({ direction: "col" }),
									css({ background: "bgSubtle", padding: "medium" }),
								)}
							>
								<h2 className={css({ fontSize: "large" })}>{mail.from.name}</h2>
								<p className="text-md text-muted-foreground">
									{mail.from.address}
								</p>
							</div>
							<div
								className="min-h-[170px] p-4"
								dangerouslySetInnerHTML={{
									__html: purify().sanitize(mail.content.html),
								}}
							/>
							<div
								className={cn(
									stack({}),
									border({ side: "t", color: "subtle" }),
									css({ p: "medium" }),
								)}
							>
								<Button className="font-semibold">Svara</Button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export function ThreadView({
	folderId,
	threadId,
	determineWidth,
}: {
	folderId: string;
	threadId: string;
	determineWidth?: (width: number) => void;
}) {
	const [_, setThreadOpen] = useAtom(threadOpen);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current?.clientWidth) {
			determineWidth?.(ref.current?.clientWidth);
		}
	}, [ref.current?.clientWidth]);

	return (
		<div className="flex flex-col max-h-full" ref={ref}>
			<Flex className="p-1" align="center" gap="0.5rem">
				<button
					className="rounded-full p-[calc(0.5rem+2px)] hover:bg-muted"
					onClick={() => {
						setThreadOpen(null);
						window.history.replaceState(null, "", `/mail/${folderId}`);
					}}
				>
					<ArrowLeftCircleIcon size={22} />
				</button>

				<div className="block h-[calc(50px/1.6)] border-r border-border"></div>

				<SelectedBar threadIds={[threadId]} folderId={folderId} />
				<div className="block h-[calc(50px/1.6)] border-r border-border"></div>
			</Flex>
			<div className="mx-auto block h-[1px] w-full border-t border-border"></div>
			<div className="overflow-y-auto w-full h-full">
				<MainPage folderId={folderId} threadId={threadId} />
			</div>
		</div>
	);
}
