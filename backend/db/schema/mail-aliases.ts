import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const quickAliases = pgTable("quick_aliases", {
  username: text("username").notNull(),
  mailAlias: text("mail_alias").notNull().unique(),
  enabled: boolean("enabled"),
  created_at: timestamp("created_at").notNull(),
});
