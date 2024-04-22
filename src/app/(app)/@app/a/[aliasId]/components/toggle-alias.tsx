"use client";

import { Button } from "@stuff/ui/button";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { changeAliasStatusAction } from "./toggle-alias.action";
import { toast } from "sonner";

export const ToggleAliasButton = ({
  enabled,
  aliasId,
}: { enabled: boolean; aliasId: string }) => {
  const router = useRouter();
  const { execute, status } = useAction(changeAliasStatusAction, {
    onSuccess(data) {
      router.refresh();
      toast(`Updated Status: ${data.enabled ? "Enabled" : "Disabled"}`);
    },
  });

  return (
    <Button
      variant="primary"
      size="md"
      rounded="medium"
      disabled={status === "executing"}
      onClick={() => execute({ aliasId, enabled: !enabled })}
    >
      {enabled ? "Disable" : "Enable"}
    </Button>
  );
};
