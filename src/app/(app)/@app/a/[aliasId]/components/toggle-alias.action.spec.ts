import { createJwt } from "@backend/utils/jwt";
import { quickAliases, users } from "@backend/db/schema";
import { testDb } from "setupTest";
import { changeAliasStatusActionHandler } from "./toggle-alias.action-handler";

vi.mock("next/headers", async () => {
  const token = await createJwt("USER", "TEST_CUSTOMER", "inactive");
  return {
    cookies: () => {
      return {
        get: (name: string) => {
          if (name === "token") {
            return { value: token };
          }
        },
      };
    },
  };
});

describe("toggle-alias", () => {
  beforeAll(async () => {
    await testDb.insert(users).values({
      userId: "USER",
      customerId: "TEST_CUSTOMERR",
      name: "testing",
      email: "test2@gmail.com",
      profileImageUrl: "https://example.com",
      status: "inactive",
      created_at: new Date(),
    });

    await testDb.insert(quickAliases).values({
      userId: "USER",
      created_at: new Date(),
      label: "testing",
      enabled: true,
      mailAlias: "TESTTESTTEST",
    });
  });

  test("test", async () => {
    const result = await changeAliasStatusActionHandler({
      clients: {
        db: testDb,
      },
      data: {
        aliasId: "TESTTESTTEST",
        userId: "USER",
        enabled: false,
      },
    });
    expect(result).toStrictEqual({ enabled: false });
  });
});
