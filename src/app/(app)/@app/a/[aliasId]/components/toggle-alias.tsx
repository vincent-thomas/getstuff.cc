"use client";

import { Button } from "@stuff/ui/button";
import { useOptimisticAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { changeAliasStatusAction } from "./toggle-alias.action";
import { toast } from "sonner";

export const ToggleAliasButton = ({
  enabled,
  aliasId,
}: { enabled: boolean; aliasId: string }) => {
  const router = useRouter();
  const { execute, optimisticData } = useOptimisticAction(
    changeAliasStatusAction,
    { enabled },
    previousState => ({ enabled: !previousState.enabled }),
    {
      onSuccess(data) {
        router.refresh();
        toast(`Alias: ${data.enabled ? "Enabled" : "Disabled"}`);
      },
    },
  );

  return (
    <Button
      variant={optimisticData.enabled ? "outline" : "primary"}
      size="md"
      rounded="medium"
      onClick={() => execute({ aliasId, enabled: !enabled })}
    >
      {optimisticData.enabled ? "Disable" : "Enable"}
    </Button>
  );
};
