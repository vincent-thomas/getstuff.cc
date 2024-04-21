import { protectedProc, router } from "backend/trpc";
import { createId } from "backend/utils/createId";
import { builtInFolder } from "backend/utils/folder";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

// export const foldersRouter = router({
//   folderExists: protectedProc
//     .input(z.object({ folderId: z.string() }))
//     .query(async ({ input: { folderId }, ctx }) => {
//       if (builtInFolder(folderId)) {
//         return true;
//       }

//       const result = await ctx.db.query.folderTable.findFirst({
//         where: and(
//           eq(folderTable.folderId, folderId),
//           eq(folderTable.username, ctx.session.username),
//         ),
//       });

//       return result !== undefined;
//     }),

//   getFolder: protectedProc
//     .input(z.object({ folderId: z.string() }))
//     .query(async ({ input: { folderId }, ctx }) => {
//       if (builtInFolder(folderId)) {
//         return null;
//       }

//       const result = await ctx.db.query.folderTable.findFirst({
//         where: and(
//           eq(folderTable.folderId, folderId),
//           eq(folderTable.username, ctx.session.username),
//         ),
//       });

//       return result;
//     }),

//   createFolder: protectedProc
//     .input(z.object({ name: z.string() }))
//     .mutation(async ({ ctx, input }) => {
//       const folderId = createId();

//       await ctx.db.insert(folderTable).values({
//         folderId,
//         folderName: input.name,
//         parentFolderId: null,
//         username: ctx.session.username,
//       });
//     }),
//   listFolders: protectedProc.query(async ({ ctx }) => {
//     const folders = await ctx.db.query.folderTable.findMany({
//       where: eq(folderTable.username, ctx.session.username),
//       orderBy: (folders, { asc }) => asc(folders.createdAt),
//     });

//     return folders;
//   }),
// });
