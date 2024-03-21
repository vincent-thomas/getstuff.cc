import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { getDataTable } from "@stuff/infra-constants";
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
  })
})