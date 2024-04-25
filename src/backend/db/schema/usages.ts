import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const usagesTable = pgTable("usages", {
  usageId: text("usage_id").primaryKey(),
  customerId: text("customer_id")
    .notNull()
    .references(() => userTable.customerId),
  value: integer("value").notNull(),
  createdAt: timestamp("created_at").notNull(),
});
