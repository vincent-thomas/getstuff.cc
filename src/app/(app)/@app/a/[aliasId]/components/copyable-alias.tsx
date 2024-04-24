"use client";

import { Button } from "@stuff/ui/button";
import type { ReactNode } from "react";
import { toast } from "sonner";

export const CopyAbleAlias = ({
  aliasId,
  children,
}: { aliasId: string; children?: ReactNode }) => {
  return (
    <Button
      variant="ghost"
      size="xs"
      rounded="medium"
      className={cn(
        css({
          fontSize: "medium",
          color: { default: "text1", hover: "text1" },
        }),
      )}
      onClick={async () => {
        await navigator.clipboard.writeText(
          `${aliasId}@${env.NEXT_PUBLIC_DOMAIN}`,
        );
        toast("Alias copied");
      }}
    >
      {children}
    </Button>
  );
};
