import { db } from "backend/db";
import { customerTable, users } from "backend/db/schema";
import { eq } from "drizzle-orm";

export function getUser(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  });
}

export const getCustomer = (customer_id: string) => {
  return db.query.customerTable.findFirst({
    where: eq(customerTable.customerId, customer_id),
  });
};
