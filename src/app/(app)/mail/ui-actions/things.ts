import { InboxIcon, LogOutIcon, type LucideIcon } from "lucide-react";
import { store } from "src/app/global-store";
import { isComposing } from "./compose";
import { logoutMutation } from "../_components/account-viewer.actions";

type Thing = {
	label: string;
	Icon: LucideIcon;
	action: () => void | Promise<void>;
	type: GROUPS;
};

enum GROUPS {
	FEATURES = "Features",
	ACCOUNT = "Account",
}

export const actions: Thing[] = [
	{
		label: "Compose email",
		type: GROUPS.FEATURES,
		Icon: InboxIcon,
		action: () => {
			store.set(isComposing, true);
			console.log("composing...");
		},
	},
	{
		type: GROUPS.ACCOUNT,
		label: "Log out",
		Icon: LogOutIcon,
		action: async () => {
			await logoutMutation();
		},
	},
];
