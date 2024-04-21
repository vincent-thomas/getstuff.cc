import { db } from "backend/db";
import { getUserFromHeader } from "backend/utils/getUserFromHeaders";
import { and, eq, gte } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

const encoder = new TextEncoder();

export const sendData = async (
  writer: WritableStreamDefaultWriter,
  data: unknown,
  id?: string,
) => {
  // let message = `retry: 30000\ndata: ${JSON.stringify(data)}`;
  // if (id) {
  //   message += `\nid: ${id}`;
  // }
  // await writer.write(encoder.encode(`${message}\n\n`));
};

export const dynamic = "force-dynamic";
export const GET = async (
  req: NextRequest,
  { params }: { params: { folder: string } },
) => {
  // const username = req.cookies.get("stuff-active")?.value ?? "";
  // const userKey = `stuff-token-${username}`;
  // const userJwt = req.cookies.get(userKey)?.value ?? "";
  // const user = await getUserFromHeader({
  //   "stuff-active": username,
  //   [userKey]: userJwt,
  // });
  // if (user === null) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }
  // const responseStream = new TransformStream();
  // const writer = responseStream.writable.getWriter();
  // let poll: NodeJS.Timeout;
  // let lastest_fetch: Date = new Date();
  // writer.closed.catch(() => {
  //   clearInterval(poll);
  // });
  // writer.ready
  //   .then(() => {
  //     poll = setInterval(async () => {
  //       const newData = await db
  //         .select()
  //         .from(threadTable)
  //         .where(and(gte(threadTable.createdAt, lastest_fetch)))
  //         .innerJoin(
  //           threadViewTable,
  //           and(
  //             eq(threadViewTable.username, user.username),
  //             eq(threadViewTable.folderId, params.folder),
  //           ),
  //         );
  //       lastest_fetch = new Date();
  //       // const newData = await db
  //       //   .select()
  //       //   .from(threadViewTable)
  //       //   .where(
  //       //     and(
  //       //       eq(threadViewTable.username, username),
  //       //       eq(threadViewTable.folderId, params.folder),
  //       //       eq(threadViewTable.read, false),
  //       //     ),
  //       //   )
  //       //   .innerJoin(
  //       //     threadTable,
  //       //     and(gte(threadTable.createdAt, lastest_fetch)),
  //       //   );
  //       // const newData = await db.query.threadViewTable.findMany({
  //       //   where: and(
  //       //     eq(threadViewTable.username, user.username),
  //       //     eq(threadViewTable.folderId, params.folder),
  //       //     // gte(threadViewTable., lastest_fetch),
  //       //   ),
  //       //   with: {
  //       //     threadViewTable: true,
  //       //   },
  //       // });
  //       // console.log(item);
  //       for (const item of newData) {
  //         console.info(item.thread.createdAt, lastest_fetch);
  //         const payload = {
  //           created_at: item.thread.createdAt,
  //           read: item.thread_view.read,
  //         };
  //         await sendData(writer, payload, item.thread.threadId);
  //       }
  //     }, 4000);
  //   })
  //   .catch(() => {
  //     logger.error("writer.ready error");
  //   });
  // return new Response(responseStream.readable, {
  //   headers: {
  //     "Content-Type": "text/event-stream",
  //     Connection: "keep-alive",
  //     "Cache-Control": "no-cache, no-transform",
  //   },
  // });
};
