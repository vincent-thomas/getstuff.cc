import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  userId: text("user_id").primaryKey(),
  customerId: text("customer_id").notNull().unique(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  profileImageUrl: text("profile_url").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
