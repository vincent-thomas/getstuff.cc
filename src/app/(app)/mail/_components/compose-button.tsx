"use client";

import { FileIcon, MailIcon, PlusIcon } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
} from "packages/ui/components/menu";
import { stack } from "packages/ui/patterns/stack";
import { store } from "src/app/global-store";
import { composeActionOpen } from "../ui-actions/compose";
import { menuButton } from "./compose-button.css";

export const ComposeButton = () => {
  return (
    <Menu>
      <MenuButton
        className={cn(
          menuButton,
          stack({ gap: "md", justify: "start", align: "center" }),
          css({
            pX: "medium",
            pY: "large",
            color: "text2",
            fontWeight: "semibold",
          }),
        )}
      >
        <PlusIcon />
        New
      </MenuButton>
      <MenuContent style={{ width: "240px" }}>
        <MenuItem onClick={() => store.set(composeActionOpen, true)}>
          <MailIcon />
          E-Mail
        </MenuItem>
        <MenuItem>
          <FileIcon /> Upload file
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};
