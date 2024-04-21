// import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

// export const folderTable = pgTable(
//   "folders",
//   {
//     folderId: text("folder_id").primaryKey(),

//     username: text("username").notNull(),
//     folderName: text("folder_name").notNull(),
//     createdAt: timestamp("created_at").notNull().defaultNow(),
//     parentFolderId: text("parent_folder_id"),
//   },
//   t => ({
//     folderUnique: unique().on(t.username, t.folderName, t.parentFolderId),
//   }),
// );
