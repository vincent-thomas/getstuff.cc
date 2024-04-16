import { getUserFromHeader } from "backend/utils/getUserFromHeaders";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const GET = async (
  req: NextRequest,
  // { params }: { params: { folder: string } },
) => {
  const username = req.cookies.get("stuff-active")?.value ?? "";

  const userKey = `stuff-token-${username}`;

  const userJwt = req.cookies.get(userKey)?.value ?? "";

  const user = await getUserFromHeader({
    "stuff-active": username,
    [userKey]: userJwt,
  });

  if (user === null) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  // const encoder = new TextEncoder();

  // const CHANNEL_NAME = `new-mail-${user.username}`;
  writer.closed.catch(async () => {
    // await consumer.disconnect();
  });

  writer.ready
    .then(async () => {
      await writer.write("retry: 30000");
      // consumer.connect()
      // consumer.subscribe({ topic: CHANNEL_NAME, fromBeginning: true })
      // consumer.run({
      //   eachMessage: async ({message}) => {
      //     console.log(message.value?.toString());
      //     const json = JSON.parse(message.value?.toString());

      //     if (json.folderId !== params.folder) return;

      //     await writer.write(encoder.encode(`data: ${JSON.stringify(json.thread)}\n\n`))
      //   }
      //  })
    })
    .catch(() => {
      logger.error("writer.ready error");
    });

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
};
