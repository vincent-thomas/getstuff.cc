"use client";

import { api } from "@stuff/api-client/react";
import { clearDerivedSecretStore } from "@stuff/lib/useUserPrivateKey";
import { CircleUserIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { MenuItem } from "packages/ui/components";
import { toast } from "sonner";

export const ManageAccount = () => {
	return (
		<MenuItem>
			<CircleUserIcon />
			Manage account
		</MenuItem>
	);
};

export const Logout = () => {

	const logoutAction = useLogoutAction();

	return (
		<MenuItem
			variant="danger"
			onClick={async () => {
				await logoutAction()
			}}
		>
			<LogOutIcon /> Log out
		</MenuItem>
	);
};


export const useLogoutAction = () => {
	const logoutMutation = api.accounts.logout.useMutation();
	const router = useRouter();

	return async () => {
		await logoutMutation.mutateAsync();
		clearDerivedSecretStore();
		router.push("/auth/identify");
		toast.info("Logged out successfully");
	}
}