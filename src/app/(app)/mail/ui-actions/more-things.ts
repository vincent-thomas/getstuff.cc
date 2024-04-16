"use server";

import { redirect } from "next/navigation";

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function goToInboxAction() {
  redirect("/mail/inbox");
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function goToArchiveAction() {
  redirect("/mail/archive");
}
