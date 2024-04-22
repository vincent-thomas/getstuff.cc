import { db } from "backend/db";
import { users } from "backend/db/schema";
import { createId } from "./createId";
import { eq } from "drizzle-orm";
import { randomBytes } from "tweetnacl";
import { stripe } from "backend/sdks";

interface createUserI {
  email: string;
  name: string;
}

export const createUser = async ({ email, name }: createUserI) => {
  const userId = createId();
  const response = await stripe.customers.create({
    email,
    name,
  });

  return await db.insert(users).values({
    userId,
    email,
    profileImageUrl: `https://api.dicebear.com/8.x/micah/svg?seed=${Buffer.from(
      randomBytes(4),
    ).toString("hex")}`,
    status: "inactive",
    customerId: response.id,
    name,
  });
};

export const getUser = (userId: string) => {
  return db
    .select()
    .from(users)
    .where(eq(users.userId, userId))
    .execute()
    .then(user => user?.[0]);
};

export const getUserFromEmail = (email: string) => {
  return db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute()
    .then(user => user?.[0]);
};
