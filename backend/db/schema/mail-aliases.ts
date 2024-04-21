import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";

export const quickAliases = pgTable("quick_aliases", {
  userId: text("username")
    .notNull()
    .references(() => users.userId),
  mailAlias: text("mail_alias").primaryKey().notNull().unique(),
  enabled: boolean("enabled").notNull(),
  label: text("label").notNull(),
  created_at: timestamp("created_at").notNull(),
});
