import { createJwt } from "@backend/utils/jwt";
import { users } from "@backend/db/schema";
import { testDb } from "setupTest";
import { listAliasesActionHandler } from "./list-aliases.action-handler";
import { before } from "node:test";

vi.mock("next/headers", async () => {
  const token = await createJwt("TEST_USER", "TEST_CUSTOMER", "inactive");
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

describe("list-aliases", () => {
  beforeAll(async () => {
    await testDb.insert(users).values({
      userId: "TEST_USER",
      customerId: "TEST_CUSTOMER",
      name: "testing",
      email: "test@gmail.com",
      profileImageUrl: "https://example.com",
      status: "inactive",
      created_at: new Date(),
    });
  });

  test("test", async () => {
    const result = await listAliasesActionHandler({
      query: "",
      clients: { db: testDb },
      userId: "TEST_USER",
    });
    expect(result).toBeInstanceOf(Array);
  });
});
