import { boolean, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const message = pgTable("message", {
  messageId: text("message_id").primaryKey(),
  comeFromExternal: boolean("come_from_external").notNull(),
  sender: jsonb("sender").notNull(),
  recieverUsername: text("reciever_username").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
