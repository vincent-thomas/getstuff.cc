import { createJwt } from "@backend/utils/jwt";
import { userTable } from "@backend/db/schema";
import { testDb } from "setupTest";
import { listAliases } from "./list-aliases-action-handler";

vi.mock("next/headers", async () => {
  const token = await createJwt("TEST_USER", "TEST_CUSTOMER", undefined);
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
    await testDb.insert(userTable).values({
      userId: "TEST_USER",
      customerId: "TEST_CUSTOMER",
      name: "testing",
      email: "test@gmail.com",
      profileImageUrl: "https://example.com",
      created_at: new Date(),
    });
  });

  test("test", async () => {
    const result = await listAliases({
      query: "",
      clients: { db: testDb },
      userId: "TEST_USER",
    });
    expect(result).toBeInstanceOf(Array);
  });
});
