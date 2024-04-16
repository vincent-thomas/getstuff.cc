import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const customerStatus = pgEnum("customer_status_enum", [
  "active",
  "inactive",
  "canceled",
]);

export const customerTable = pgTable("customer", {
  customerId: text("customer_id").primaryKey(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  status: customerStatus("customer_status").notNull(),
});
