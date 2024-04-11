"use client";

import { api } from "@stuff/api-client/react";
import { button } from "@stuff/ui/button";
import { formatDate } from "date-fns";
import { atom, useAtom } from "jotai";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "packages/ui/components/dialog";
import { useMemo } from "react";
import { Card } from "src/app/(public)/_components/card";
import { border } from "src/components/recipies";

export const mailRelayOpen = atom(false);

export const MailRelayModal = () => {
	const [open, setOpen] = useAtom(mailRelayOpen);

	const { data: aliases } = api.extensions.mailRelay.listAliases.useQuery();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent size="md" style={{
					maxHeight: "90vh"
				}}
				className={cn(css({p: "large", fontWeight: "bold"}), stack({direction: "col", gap: "lg"}))}
			>
				<DialogTitle className={cn(css({fontSize:"xlarge", color: "text2"}))}>Mail Relay</DialogTitle>
				<div style={{minHeight: "300px", maxHeight: "600px", overflowY: "auto"}} className={cn(stack({direction:'col', gap:'sm'}))}>
					{(aliases ?? []).map((item, i) => (
						<MailRelay key={i} {...item} />
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

const MailRelay = (item: {label:string, description:string, created_at: number}) => {

	const isWebsite = useMemo(() => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(item.label), [item.label])

	return (
		<Dialog>
			<DialogTrigger>
				<Card p="medium" style={{borderRadius: "0px !important"}} className={cn(stack({justify: "between", direction: "col", gap: "xl"}), css({p: "medium", bg: {hover: "bgHover", default: "bgComponent"}}), border({color: "interactive", side: "all"}))}>
					<div className={cn(stack({gap: "md"}))}>
						{isWebsite && <Image width={40} height={40} src={`https://www.google.com/s2/favicons?domain=${item.label}&sz=256`} alt={`Image of '${item.label}'`} />}
						<div className={cn(stack({direction: "col"}))}>
							<h1 className={cn(css({fontSize: "medium", color: "text2"}))}>{item.label}</h1>
							<p  className={cn(css({fontSize: "small", fontWeight: "light", color: "text1"}))}>{item.description || "No description"}</p>
						</div>
					</div>
					<div className={cn(stack({justify: "between"}))}>
						<span className={cn(css({color: "text1", p: "small"}))} style={{marginTop: "auto"}}>
							{formatDate(item.created_at, "MMMM dd, yyyy")}
						</span>
						<span className={cn(button({variant: "link", size: "sm"}))}>
							View
						</span>
					</div>
				</Card>
			</DialogTrigger>
			<DialogContent size="sm" className={cn(css({p: "large", fontWeight: "bold"}), stack({direction: "col", gap: "lg"}))}>
				<DialogTitle className={cn(css({fontSize:"large", color: "text2"}))}>{item.label}</DialogTitle>
				testing
			</DialogContent>
		</Dialog>
	)
}
