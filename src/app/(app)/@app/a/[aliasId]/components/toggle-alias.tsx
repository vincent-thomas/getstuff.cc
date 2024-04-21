"use client";

import { api } from "@stuff/api-client/react";
import { Button } from "@stuff/ui/button";
import { useRouter } from "next/navigation";

export const ToggleAliasButton = ({
  enabled,
  aliasId,
}: { enabled: boolean; aliasId: string }) => {
  const changeAlias = api.mailRelay.changeAliasStatus.useMutation();
  const router = useRouter();
  return (
    <Button
      variant="primary"
      size="md"
      rounded="medium"
      disabled={changeAlias.isLoading}
      onClick={async () => {
        await changeAlias.mutateAsync({ aliasId, enabled: !enabled });
        router.refresh();
      }}
    >
      {enabled ? "Disable" : "Enable"}
    </Button>
  );
};
