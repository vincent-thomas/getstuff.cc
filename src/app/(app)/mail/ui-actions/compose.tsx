"use client";

import { H1 } from "@stuff/typography";
import { atom, useAtom } from "jotai";
import { Form } from "packages/ui/components";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTrigger,
} from "packages/ui/components/dialog";
import type { FC } from "react";
import { border } from "src/components/recipies";
import { IAction } from "./commandMenu";

const isOpen = atom(false);

export const ComposeAction: FC<IAction> = ({ trigger, className }) => {
	const [open, setOpen] = useAtom(isOpen)
	const form = Form.useStore({
		defaultValues: {
			to: "",
			subject: "",
		},
	});
	return (
		<Dialog onOpenChange={(state) => setOpen(state)} open={open}>
			<DialogTrigger asChild className={className}>{trigger}</DialogTrigger>
			<DialogContent size="lg">
				<div className={css({ p: "large" })}>
					<H1 className={cn(css({ fontSize: "xlarge" }))}>Compose</H1>
					<DialogDescription>Send an email</DialogDescription>
				</div>
				<div className={cn(border({ side: "t", color: "interactive" }))} />
				<Form.Root
					store={form}
					className={cn(
						css({ color: "text1", width: "full" }),
						stack({ direction: "col" }),
					)}
				>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "auto 1fr",
							alignItems: "center",
						}}
						className={cn(css({ pX: "large" }))}
					>
						<Form.Label name={form.names.to}>To:</Form.Label>
						<Form.Input
							name={form.names.to}
							className={cn(
								css({
									fontSize: "medium",
									marginLeft: "small",
									pY: "large",
									color: "text2",
								}),
							)}
						/>
					</div>
					<div className={cn(border({ side: "t", color: "interactive" }))} />
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "auto 1fr",
							alignItems: "center",
						}}
						className={cn(css({ pX: "large" }))}
					>
						<Form.Label name={form.names.subject}>Subject:</Form.Label>
						<Form.Input
							name={form.names.subject}
							className={cn(
								css({
									fontSize: "medium",
									marginLeft: "small",
									pY: "large",
									color: "text2",
								}),
							)}
						/>
					</div>
				</Form.Root>
			</DialogContent>
		</Dialog>
	);
};
