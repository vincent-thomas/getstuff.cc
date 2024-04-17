import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customerTable } from "./customer";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
  username: text("id").primaryKey(),
  customerId: text("customer_id").notNull().unique(),
  name: text("name").notNull(),
  salt: text("salt").notNull(),
  publicKey: text("public_key").notNull(),
  verifier: text("srp_verifier").notNull(),
  encryptedUserData: text("encrypted_user_data").notNull(),
  encryptedDataKey: text("encrypted_user_data_key").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const userRelation = relations(users, ({ one }) => ({
  customer: one(customerTable, {
    fields: [users.customerId],
    references: [customerTable.customerId],
  }),
}));
