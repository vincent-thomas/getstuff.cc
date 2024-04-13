"use server";

import { redirect } from "next/navigation";

export async function goToInboxAction() {
	redirect("/mail/inbox");
}

export async function goToArchiveAction() {
	redirect("/mail/archive");
}
