"use client";

import { formatDate } from "date-fns";
import { border } from "src/components/recipies";
import { toast } from "sonner";
import { EllipsisVerticalIcon } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
} from "packages/ui/components";
import { api } from "@stuff/api-client/react";
import { Link } from "src/components/structure/link";

export const Alias = ({
  label,
  mailAlias,
  created_at,
}: { label: string; mailAlias: string; created_at: Date }) => {
  const remove = api.mailRelay.removeAlias.useMutation();
  const utils = api.useUtils();

  return (
    <div
      className={cn(
        stack({ gap: "md", align: "center" }),
        css({ bg: { hover: "bgHover" } }),
        border({ rounded: "radius" }),
      )}
    >
      <Link
        href={`/a/${mailAlias}`}
        className={cn(
          border({ rounded: "radius" }),
          css({ p: "large" }),
          stack({ direction: "col", align: "start" }),
        )}
        key={mailAlias}
      >
        <p className={cn(css({ color: "text2", fontSize: "medium" }))}>
          {label}
        </p>
        <p className={cn(css({ color: "text1", fontSize: "small" }))}>
          {mailAlias}@getstuff.cc
        </p>
      </Link>
      <p
        className={cn(
          css({ color: "text1", marginLeft: "auto" }),
          stack({ align: "center" }),
        )}
      >
        {formatDate(created_at, "MMM dd, yyyy")}
      </p>
      <Menu>
        <MenuButton className={cn(css({ paddingRight: "large" }))}>
          <EllipsisVerticalIcon color={palette.text2} />
        </MenuButton>
        <MenuContent>
          <MenuItem
            onClick={() => {
              navigator.clipboard.writeText(`${mailAlias}@getstuff.cc`);
              toast.info("Copied to clipboard");
            }}
          >
            Copy Alias
          </MenuItem>
          <MenuItem
            variant="danger"
            onClick={async () => {
              await remove.mutateAsync({ alias: mailAlias });
              await utils.mailRelay.listAliases.invalidate();
            }}
          >
            Delete
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
};
