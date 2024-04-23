"use client";

import { Button } from "@stuff/ui/button";
import { useAction } from "next-safe-action/hooks";
import { border } from "src/components/recipies";
import { getStuffPlusLink } from "./actions/subscribe.action";

export const SubscribeButton = () => {
  const { execute } = useAction(getStuffPlusLink, {
    onSuccess(data) {
      window.location.href = data.checkoutUrl;
    },
  });

  return (
    <Button
      className={cn(
        css({ p: "medium", color: "text1", bg: { hover: "bgHover" } }),
        border({ side: "all", rounded: "xl", color: "interactive" }),
      )}
      onClick={() => execute(undefined)}
    >
      Get Stuff+
    </Button>
  );
};
