"use client";

import { useRouter } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from "packages/ui/components";
import { toast } from "sonner";
import { signOutAction } from "./actions/signout.action";
import { useAction } from "next-safe-action/hooks";
import { useGetUser } from "@backend/actions/getUser";
import { generateBillingSession } from "@backend/actions/generateBillingSession/handler";
import { z } from "zod";

export const Profile = ({ url }: { url: string }) => {
  const router = useRouter();
  const { execute } = useAction(signOutAction, {
    onSuccess() {
      toast("Signed out");
      router.refresh();
    },
  });

  const user = useGetUser();

  return (
    <Menu>
      <MenuButton>
        <img src={url} width={50} height={50} alt="user profile" />
      </MenuButton>
      <MenuContent>
        {user.data?.customerStatus !== "inactive" && (
          <MenuItem
            onClick={async () => {
              const result = await generateBillingSession({
                customerId: z.string().parse(user.data?.customerId),
              });

              window.location.href = result.url;
            }}
          >
            Manage Billing
          </MenuItem>
        )}
        <MenuSeparator />
        <MenuItem onClick={() => execute(undefined)}>Sign out</MenuItem>
      </MenuContent>
    </Menu>
  );
};
