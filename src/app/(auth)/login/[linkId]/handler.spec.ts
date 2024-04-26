import { innerRequest } from "./handler";
import { createId } from "@backend/utils/createId";
import { userTable } from "@backend/db/schema";
import { verifyJwt } from "@backend/utils/jwt";
import { testDb, testRedis } from "setupTest";

vi.mock("next/headers", async () => {
  return {
    cookies: () => {
      return {
        set: (name: string, value: string) => {
          expect(name).toBe("token");
          expect(verifyJwt.bind(this, value)).not.toThrow();
        },
      };
    },
  };
});

const linkId = createId();

describe("Login function", () => {
  beforeAll(async () => {
    const email = "vincent@example.com";

    await testRedis.set(`auth:magic-link:${linkId}`, email, "EX", 300);

    await testDb.insert(userTable).values({
      email,
      customerId: "testing",
      name: "testing",
      profileImageUrl: "example.com",
      userId: "TEST",
      created_at: new Date(),
    });
  });

  test("test", async () => {
    const result = await innerRequest({
      db: testDb,
      redis: testRedis,
      params: { linkId },
    });
    expect(result.status).toBe(302);
  });
});
