import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getDataTable } from "@stuff/infra-constants";
import { addressAliasInterface } from "backend/interfaces/addressAlias";
import { protectedProc, router } from "backend/trpc";
import { z } from "zod";

export const addressAliasesRouter = router({
  getAliases: protectedProc
    .input(z.object({ folderId: z.string() }))
    .query(async ({ ctx }) => {
      const threadViewsCommand = new QueryCommand({
        TableName: getDataTable(env.STAGE),
        KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
        ExpressionAttributeValues: {
          ":sk": `address-alias|`,
          ":pk": "mail|" + ctx.session.username,
        },
      });

      const { Items } = await ctx.dyn.send(threadViewsCommand);

      return z.array(addressAliasInterface).parse(Items);
    }),
});
