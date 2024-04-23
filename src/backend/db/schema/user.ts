import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const customerStatus = pgEnum("customer_status_enum", [
  "active",
  "inactive",
  "canceled",
]);

export const users = pgTable("user", {
  userId: text("user_id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  profileImageUrl: text("profile_url").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),

  customerId: text("customer_id").notNull().unique(),
  status: customerStatus("customer_status").notNull(),
});
