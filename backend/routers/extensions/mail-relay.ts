import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getDataTable } from "@stuff/infra-constants";
import { addressAliasInterface } from "backend/interfaces/addressAlias";
import { protectedProc, router } from "backend/trpc";


export const mailRelayRouter = router({
  enabled: protectedProc.query(async ({ctx}) => {
    const command = new GetCommand({
      TableName: getDataTable(ctx.env.STAGE),
      Key: {
        pk: `extension|${ctx.session.username}`,
        sk: `mail-relay`,
      }
    })

    const response = await ctx.dyn.send(command).then(v => v.Item);

    return response !== undefined;
  }),
  enable: protectedProc.mutation(async ({ctx}) => {

    const command = new PutCommand({
      TableName: getDataTable(ctx.env.STAGE),
      Item: {
        pk: `extension|${ctx.session.username}`,
        sk: `mail-relay`,
      }
    })

    await ctx.dyn.send(command);
  }),
  listAliases: protectedProc.query(async ({ctx}) => {
    const command = new QueryCommand({
      TableName: getDataTable(ctx.env.STAGE),
      KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": `mail|${ctx.session.username}`,
        ":sk": `address-alias|enabled|`
      }
    })

    const response = await ctx.dyn.send(command).then(v => addressAliasInterface.array().parse(v.Items));

    return response;
  })
})