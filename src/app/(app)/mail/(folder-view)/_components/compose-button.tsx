"use client";

import { ArrowUpIcon, PlusIcon } from "lucide-react";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@stuff/ui/drawer/drawer";
import { cn } from "packages/components/utils";
import { useState } from "react";
import Tiptap from "../[folder]/_components/tiptap";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@stuff/api-client/react";
import { ScrollArea } from "packages/components/lib/scroll-area";
import { Flex } from "@stuff/structure";
import { button } from "@stuff/ui/button/button.css";
import { Button } from "@stuff/ui/button";
import { border, stack } from "src/components/recipies";
import { palette } from "packages/ui/theme";
import { Text2 } from "packages/ui/atoms";

const mailSendInterface = z.object({
	to: z.string().email(),
	subject: z.string(),
});

const contentInterface = z.object({
	text: z.string(),
	html: z.string(),
});

export const ComposeButton = () => {
	const [open, setOpen] = useState(false);
	const [defaultContent, setDefaultContent] = useState({ text: "", html: "" });

	const sendMailMutation = api.mail.sendMail.sendMail.useMutation();

	const { register, handleSubmit, setValue } = useForm<
		z.infer<typeof mailSendInterface>
	>({
		resolver: zodResolver(mailSendInterface),
	});

	const onSubmit = handleSubmit((data) => {
		const total = { ...data, content: contentInterface.parse(defaultContent) };

		const promise = sendMailMutation.mutateAsync.bind(this, {
			bcc: [],
			cc: [],
			content: total.content,
			subject: total.subject,
			to: [total.to],
		});

		setOpen(false);

		toast.promise(promise, {
			loading: "Loading...",
			position: "bottom-center",
			success() {
				return "Email sent";
			},
			error() {
				setOpen(true);
				return `Unknown Error: Failed to send email`;
			},
		});
		setValue("to", "");
		setValue("subject", "");
	});

	return (
		<Drawer
			dismissible={false}
			shouldScaleBackground
			onOpenChange={(isOpen) => setOpen(isOpen)}
			open={open}
		>
			<DrawerTrigger
				className={cn(
					stack({ align: "center", gap: "md" }),
					border({ rounded: "radius", color: "interactive", side: "all" }),
					css({
						p: "medium",
						bg: { default: "bgComponent", hover: "bgHover" },
					}),
					// "outline-border outline outline-[2px] outline-offset-[-2px]",
				)}
				onClick={() => setOpen(true)}
			>
				<PlusIcon color={palette.text2} size={24} />
				<Text2 className={cn(css({ fontWeight: "semibold", color: "text2" }))}>
					Compose
				</Text2>
			</DrawerTrigger>

			<DrawerContent
				asChild
				style={{
					display: "grid",
					gridTemplateRows: "auto 1fr auto",
					maxHeight: "1000px",
					maxWidth: "800px",
				}}
			>
				<form onSubmit={onSubmit}>
					<div>
						<DrawerHeader>
							<div
								className={stack({
									justify: "between",
									direction: "row",
									align: "center",
								})}
							>
								<div className={stack({ direction: "col", gap: "md" })}>
									<DrawerTitle>Send Email</DrawerTitle>
									<DrawerDescription>
										Sending an email cant be undone
									</DrawerDescription>
								</div>
								<Button
									className={cn(css({ bg: "text1", padding: "small" }))}
									type="submit"
								>
									<ArrowUpIcon color={palette.background1} size={26} />
								</Button>
							</div>
						</DrawerHeader>
						<div
							className={
								"" /*css({borderTopColor: "border",borderTopWidth: '1px'})*/
							}
						>
							<Flex
								className="w-full border-b border-border px-6 py-3"
								gap="1rem"
								align="center"
							>
								<span className={css({ color: "text2" })}>To:</span>
								<input
									{...register("to")}
									className="h-full w-full bg-transparent outline-none"
								/>
							</Flex>
							<input
								type="text"
								className={cn(
									"w-full bg-transparent text-2xl outline-none",
									css({ p: "xlarge" }),
								)}
								placeholder="Subject"
								{...register("subject")}
							/>
						</div>
					</div>
					<ScrollArea
						style={{ height: "100%" }}
						className={css({ pX: "large" })}
					>
						<Tiptap
							placeholder="Compose your email..."
							initialContent="<p></p>"
							onUpdate={({ text, html }) => setDefaultContent({ text, html })}
						/>
					</ScrollArea>
					<DrawerFooter>
						<DrawerClose
							className={cn(button({ variant: "outline", size: "lg" }))}
							type="button"
						>
							Cancel
						</DrawerClose>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	);
};
