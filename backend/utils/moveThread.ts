// import { db } from "../../backend/db";
// import { folderTable, threadViewTable } from "backend/db/schema";
// import { and, eq } from "drizzle-orm";

// export const moveThread = async (
//   username: string,
//   threadId: string,
//   oldFolderId: string,
//   newFolderId: string,
// ) => {
//   const item = await db
//     .select()
//     .from(folderTable)
//     .where(
//       and(
//         eq(folderTable.username, username),
//         eq(folderTable.folderId, oldFolderId),
//       ),
//     );

//   if (item.length === 0) {
//     return { success: false };
//   }

//   await db
//     .update(threadViewTable)
//     .set({ folderId: newFolderId })
//     .where(
//       and(
//         eq(threadViewTable.username, username),
//         eq(threadViewTable.threadId, threadId),
//       ),
//     );
//   return { success: true };
// };
