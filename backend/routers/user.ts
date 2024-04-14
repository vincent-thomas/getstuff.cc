import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { protectedProc, pubProc, router } from "../trpc";
import { userInterface } from "../interfaces/user";
import { customerInterface } from "../interfaces/customer";
import { getCustomerTable, getUserTable } from "@stuff/infra-constants";

export const userRouter = router({
  encryptedData: protectedProc.query(async ({ ctx: { session, dyn } }) => {
    const userId = session.username;

    const response = await dyn.send(
      new GetCommand({
        TableName: getUserTable(env.STAGE),
        Key: {
          user_id: userId,
        },
      }),
    );

    try {
      const user = userInterface.parse(response.Item);
      const { Item: customer_RAW } = await dyn.send(
        new GetCommand({
          TableName: getCustomerTable(env.STAGE),
          Key: {
            customer_id: user.customerId,
          },
        }),
      );
      const customer = customerInterface.parse(customer_RAW);

      return {
        encryptedUserData: user.encryptedUserData,
        encryptedDataKey: user.encryptedDataKey,
        username: user.user_id,
        name: user.name,
        has_plus: customer?.status === "active",
      };
    } catch (e) {
      logger.error("Unknown error, rpc.encryptedData");

      return null;
    }
  }),
  session: pubProc.query(({ ctx: { session } }) => {
    return session;
  }),
});
