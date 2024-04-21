import {
  ArchiveIcon,
  InboxIcon,
  LogOutIcon,
  type LucideIcon,
  NotebookIcon,
  PuzzleIcon,
} from "lucide-react";
import { store } from "src/app/global-store";
import { logoutMutation } from "../_components/account-viewer.actions";
import { extensionsOpen } from "../_components/extensions";
import { composeActionOpen } from "./compose";
import { mailRelayOpen } from "./mailRelay";
import { goToArchiveAction, goToInboxAction } from "./more-things";

type Thing = {
  label: string;
  Icon: LucideIcon;
  action: () => void | Promise<void>;
  type: GROUPS;
};

export enum GROUPS {
  FEATURES = "Features",
  NAVIGATION = "Navigation",
  ACCOUNT = "Account",
}

export const actions: Thing[] = [
  {
    label: "Compose email",
    type: GROUPS.FEATURES,
    Icon: InboxIcon,
    action: () => {
      store.set(composeActionOpen, true);
    },
  },
  {
    type: GROUPS.FEATURES,
    label: "View all extensions",
    Icon: PuzzleIcon,
    action: () => store.set(extensionsOpen, true),
  },
  {
    type: GROUPS.FEATURES,
    label: "Extension: Mail Relay",
    Icon: NotebookIcon,
    action: () => store.set(mailRelayOpen, true),
  },
  {
    type: GROUPS.FEATURES,
    label: "Extension: Folder rules",
    Icon: NotebookIcon,
    action: () => store.set(mailRelayOpen, true),
  },

  {
    type: GROUPS.ACCOUNT,
    label: "Log out",
    Icon: LogOutIcon,
    action: async () => {
      await logoutMutation();
    },
  },

  {
    type: GROUPS.NAVIGATION,
    label: "Go to inbox",
    Icon: InboxIcon,
    action: goToInboxAction,
  },
  {
    type: GROUPS.NAVIGATION,
    label: "Go to archive",
    Icon: ArchiveIcon,
    action: goToArchiveAction,
  },
];
