import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { threadTable } from "./thread";

export const threadViewTable = pgTable("thread_view", {
  username: text("username").primaryKey(),
  folderId: text("folder_id").notNull(),
  threadId: text("thread_id")
    .notNull()
    .references(() => threadTable.threadId),
  read: boolean("read").notNull().default(false),
  lastActive: timestamp("last_active"),
});
