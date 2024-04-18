import { db } from "../../backend/db";
import { folderTable, threadViewTable } from "backend/db/schema";
import { and, eq } from "drizzle-orm";

export const moveThread = async (
  stage: string,
  username: string,
  newFolderId: string,
) => {

  const item = await db.select().from(folderTable).where(and(eq(folderTable.username, username)));

  if (item.length === 0) {
    return {success: false};
  }

  await db.update(threadViewTable).set({folderId: newFolderId}).where(and(eq(threadViewTable.username, username)))
  return { success: true };
};
