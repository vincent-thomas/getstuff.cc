import { redirect } from "next/navigation";
import { MailMessage } from "./message";
import { api } from "@stuff/api-client/server";
import { border } from "src/components/recipies";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "packages/ui/components/tooltip/tooltip";
import { Button } from "@stuff/ui/button";
import { ShieldCheckIcon } from "lucide-react";
import { pulse } from "packages/ui/keyframes";

export const ThreadContentSkeleton = () => {
	return (
		<div
			className={cn(
				css({ width: "full", bg: "bgComponent" }),
				border({ rounded: "radius" }),
			)}
			style={{
				height: "270px",
				animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
			}}
		/>
	);
};

export const ThreadContent = async (conversationProps: {
	folderId: string;
	threadId: string;
}) => {
	const conversation =
		await api.mail.threads.getThread.query(conversationProps);

	if (conversation === null) {
		redirect(`/mail/${conversationProps.folderId}`);
	}
	return (
		<>
			<ThreadHeading title={conversation?.thread.title} />
			<div className={cn(css({ overflowY: "auto", p: "medium" }))}>
				<div className={stack({ direction: "col", gap: "md" })}>
					{conversation.messages.map((thread) => (
						<MailMessage key={thread.messageId} thread={thread} />
					))}
				</div>
			</div>
		</>
	);
};

const ThreadHeading = ({ title }: { title: string }) => {
	return (
		<div
			className={cn(
				css({ p: "medium" }),
				stack({ gap: "lg", align: "center", justify: "between" }),
			)}
		>
			<h1 className={cn(css({ fontSize: "large", color: "text2" }))}>
				{title}
			</h1>
			<Tooltip>
				<TooltipTrigger render={<Button variant="icon" size="sm" />}>
					<ShieldCheckIcon size={18} color={palette.text1} />
				</TooltipTrigger>
				<TooltipContent>
					<p className={cn(css({ color: "text1", fontSize: "small" }))}>
						This thread is encrypted by Stuff, only you can read this
					</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
};
