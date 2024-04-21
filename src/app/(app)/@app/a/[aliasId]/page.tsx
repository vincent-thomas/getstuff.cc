import { db } from "backend/db";
import { setupPage } from "src/utils/setupPage";
import { getUser } from "../../layout";
import { and, eq } from "drizzle-orm";
import { quickAliases } from "backend/db/schema";
import { z } from "zod";
import { notFound } from "next/navigation";
import { Button } from "@stuff/ui/button";
import { ToggleAliasButton } from "./components/toggle-alias";
import { border } from "src/components/recipies";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "packages/ui/components/tooltip/tooltip";

export default setupPage({
  params: z.object({ aliasId: z.string() }),
  async Component({ params }) {
    const user = await getUser();
    const alias = await db.query.quickAliases.findFirst({
      where: and(
        eq(quickAliases.userId, user.userId),
        eq(quickAliases.mailAlias, params.aliasId),
      ),
    });

    if (alias === undefined) {
      notFound();
    }
    return (
      <div className={cn(stack({ direction: "col" }))}>
        <div className={cn(stack({ justify: "between", align: "start" }))}>
          <div className={cn(stack({ direction: "col", gap: "sm" }))}>
            <h1
              className={cn(
                css({ fontSize: "large", color: "text2" }),
                stack({ gap: "md" }),
              )}
            >
              <span>{alias.label}</span>
              <span
                className={cn(
                  css({
                    fontSize: "small",
                    pY: "xsmall",
                    pX: "small",
                    fontWeight: "semibold",
                  }),
                  border({ side: "all", color: "subtle", rounded: "xl" }),
                )}
              >
                {alias.enabled ? "Active" : "Disabled"}
              </span>
            </h1>
            <Tooltip placement="bottom-start">
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="xs"
                    rounded="medium"
                    render={
                      <h2
                        className={cn(
                          css({
                            fontSize: "medium",
                            color: { default: "text1", hover: "text1" },
                          }),
                        )}
                      />
                    }
                  />
                }
              >
                {alias.mailAlias}@getstuff.cc
              </TooltipTrigger>
              <TooltipContent>Copy alias</TooltipContent>
            </Tooltip>
          </div>
          <ToggleAliasButton
            aliasId={alias.mailAlias}
            enabled={alias.enabled}
          />
        </div>
      </div>
    );
  },
});
