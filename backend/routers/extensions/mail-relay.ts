import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { getDataTable } from "@stuff/infra-constants";
import { addressAliasInterface } from "backend/interfaces/addressAlias";
import { protectedProc, router } from "backend/trpc";
import { z } from "zod";
import { generate } from "random-words";
import { TRPCError } from "@trpc/server";

export const mailRelayRouter = router({
  enabled: protectedProc.query(async ({ ctx }) => {
    const command = new GetCommand({
      TableName: getDataTable(env.STAGE),
      Key: {
        pk: `extension|${ctx.session.username}`,
        sk: `mail-relay`,
      },
    });

    const response = await ctx.dyn.send(command).then((v) => v.Item);

    return response !== undefined;
  }),
  enable: protectedProc.mutation(async ({ ctx }) => {
    const command = new PutCommand({
      TableName: getDataTable(env.STAGE),
      Item: {
        pk: `extension|${ctx.session.username}`,
        sk: `mail-relay`,
      },
    });

    await ctx.dyn.send(command);
  }),
  listAliases: protectedProc.query(async ({ ctx }) => {
    const command = new QueryCommand({
      TableName: getDataTable(env.STAGE),
      KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": `mail|${ctx.session.username}`,
        ":sk": `address-alias|`,
      },
    });

    const response = await ctx.dyn
      .send(command)
      .then((v) => addressAliasInterface.array().parse(v.Items));

    return response;
  }),

  removeAlias: protectedProc
    .input(
      z.object({
        alias: z.string(),
        enabled: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const command = new DeleteCommand({
        TableName: getDataTable(env.STAGE),
        Key: {
          pk: `mail|${ctx.session.username}`,
          sk: `address-alias|${input.enabled ? "enabled" : "disabled"}|${
            input.alias
          }`,
        },
      });

      const response = await ctx.dyn.send(command);
      return response;
    }),

  createAlias: protectedProc
    .input(
      z.object({
        label: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const words = generate({
        min: 3,
        max: 3,
        join: "-",
      });

      const getCommand = new QueryCommand({
        TableName: getDataTable(env.STAGE),
        KeyConditionExpression: "begins_with(pk, :pk) and sk = :sk",
        IndexName: "gsi1",
        ExpressionAttributeValues: {
          ":pk": `mail|`,
          ":sk": `address-alias|${words}`,
        },
      });

      const existingAlias = await ctx.dyn
        .send(getCommand)
        .then((v) => v.Items)
        .then((v) => addressAliasInterface.array().parse(v));

      if (existingAlias.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Alias already exists",
        });
      }

      const command = new PutCommand({
        TableName: getDataTable(env.STAGE),
        Item: addressAliasInterface.parse({
          pk: `mail|${ctx.session.username}`,
          sk: `address-alias|${words}`,
          label: input.label,
          description: "",
          enabled: true,
          created_at: Date.now(),
        }),
      });

      await ctx.dyn.send(command);
    }),
});
