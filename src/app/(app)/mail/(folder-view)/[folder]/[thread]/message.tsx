"use client";

import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useMemo } from "react";
import { decryptAsymmetric, decryptSymmetric } from "@stuff/lib/crypto";
import { useDataKey } from "@stuff/lib/useUserPrivateKey";
import { border } from "src/components/recipies";
import purify from "dompurify";
import { pulse } from "packages/ui/keyframes";
import { Button } from "@stuff/ui/button";

export interface MailMessage {
	messageId: string;
	to: {
		name: string;
		address: string;
	}[];
	from: {
		name: string;
		address: string;
	};
	subject: string;
	contentUrl: string;
	messageEncryptionKey: string;
}

export const MailMessageSkeleton = () => {
	return (
		<div
			className={cn(
				css({ width: "full", bg: "bgComponent" }),
				border({ rounded: "radius" }),
			)}
			style={{
				height: "100px",
				animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
			}}
		/>
	);
};

export const MailMessage = ({ thread }: { thread: MailMessage }) => {
	const dataKey = useDataKey();

	const threadEncryptionKey = useMemo(() => {
		if (dataKey === undefined) {
			return null;
		}
		return decryptAsymmetric(thread.messageEncryptionKey, dataKey);
	}, [dataKey, thread.messageEncryptionKey]);

	const mailMessage = useQuery({
		queryKey: ["mailMessage", thread.messageId, dataKey],
		queryFn: async () => {
			const json = await fetch(thread.contentUrl, { cache: "force-cache" })
				.then((props) => props.json())
				.then((props) =>
					z.object({ text: z.string(), html: z.string() }).parse(props),
				);

			return json;
		},
	});

	const safeHtmlContent = useMemo((): string | null => {
		if (mailMessage.data === undefined || threadEncryptionKey === null) {
			return null;
		}
		return purify().sanitize(
			decryptSymmetric(mailMessage.data.html, threadEncryptionKey),
		);
	}, [mailMessage.data]);

	return (
		<div
			className={cn(
				stack({ direction: "col" }),
				border({ rounded: "radius", color: "interactive", side: "all" }),
				css({ overflow: "hidden" }),
			)}
		>
			<div className={cn(css({ bg: "bgComponent", p: "large" }))}>
				<h2 className={cn(css({ color: "text2" }))}>{thread.from.name}</h2>
				<h3 className={cn(css({ color: "text1" }))}>{thread.from.address}</h3>
			</div>
			<div className={cn(css({ p: "large" }))}>
				{mailMessage.data === undefined || safeHtmlContent === null ? (
					<div
						style={{
							animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
							height: "100px",
						}}
						className={cn(
							border({ rounded: "radius" }),
							css({ width: "full", bg: "bgHover" }),
						)}
					/>
				) : (
					<div
						className={cn(css({ color: "text2" }))}
						dangerouslySetInnerHTML={{
							__html: safeHtmlContent,
						}}
					/>
				)}
			</div>
			<div
				className={cn(
					css({ p: "medium" }),
					border({ side: "t", color: "interactive" }),
				)}
			>
				<Button variant="primary" size="md">
					Svara
				</Button>
			</div>
		</div>
	);
};
