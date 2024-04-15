import { getUserFromHeader } from "backend/utils/getUserFromHeaders";
import {EventEmitter} from "events";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// @ts-expect-error testing
global.ee = global.ee || new EventEmitter();

export const GET = async (req: NextRequest, {params}: {params: {folder: string}}) => {

// console.log(req.cookies.get(""));
  const username = req.cookies.get("stuff-active")?.value ?? "";

  const userKey = `stuff-token-${username}`

  const userJwt = req.cookies.get(userKey)?.value ?? "";


  const user = await getUserFromHeader({
    "stuff-active": username,
    [userKey]: userJwt
  });

  if (user === null) {
    return NextResponse.json({message: "Unauthorized"}, {status: 401})
  }

  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  writer.closed.catch(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    // @ts-expect-error testing
    global.ee.removeAllListeners();
  })

  writer.ready.then(async () => {
    // @ts-expect-error testing
    global.ee.on(`new-mail:${user.username}:${params.folder}`, async (data) => {
      await writer.write(encoder.encode(`data: ${data}\n\n`))
    })
  }).catch(e => {
    console.log('writer.ready error', e)
  })

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
};