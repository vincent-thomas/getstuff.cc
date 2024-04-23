import { redis } from "@backend/sdks";
import type { NextRequest } from "next/server";
import { innerRequest } from "./handler";

export const GET = (
  _req: NextRequest,
  { params }: { params: { linkId: string } },
) => innerRequest({ redis, params });
