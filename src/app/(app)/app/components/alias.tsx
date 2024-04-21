"use client";

import { formatDate } from "date-fns";
import { border } from "src/components/recipies";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "packages/ui/components/tooltip/tooltip";
import { toast } from "sonner";
import { useEffect } from "react";
import { EllipsisVerticalIcon } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
} from "packages/ui/components";
import { api } from "@stuff/api-client/react";

const CopyableAlias = ({ alias }: { alias: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <button
        type="button"
          className={cn(css({ color: "text1" }))}
          onClick={() => {
            navigator.clipboard.writeText(`${alias}@getstuff.cc`);
            toast.info("Copied to clipboard");
          }}
        >
          {alias}@getstuff.cc
        </button>
      </TooltipTrigger>
      <TooltipContent>Copy alias</TooltipContent>
    </Tooltip>
  );
};

export const Alias = ({
  label,
  mailAlias,
  created_at,
}: { label: string; mailAlias: string; created_at: Date }) => {
  const remove = api.mailRelay.removeAlias.useMutation();

  return (
    <div
      className={cn(
        stack({ gap: "md" }),
        css({ p: "large", bg: { hover: "bgHover" } }),
        border({ rounded: "radius" }),
      )}
      key={mailAlias}
    >
      <div>
        <p className={cn(css({ color: "text2", fontSize: "medium" }))}>
          {label}
        </p>
        <CopyableAlias alias={mailAlias} />
      </div>
      <p
        className={cn(
          css({ color: "text1", marginLeft: "auto" }),
          stack({ align: "center" }),
        )}
      >
        {formatDate(created_at, "MMM dd, yyyy")}
      </p>
      <Menu>
        <MenuButton>
          <EllipsisVerticalIcon color={palette.text2} />
        </MenuButton>
        <MenuContent>
          <MenuItem
            variant="danger"
            onClick={() => {
              remove.mutate({ alias: mailAlias });
            }}
          >
            Delete
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
};
