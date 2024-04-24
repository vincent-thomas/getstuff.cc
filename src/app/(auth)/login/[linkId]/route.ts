import { redis } from "@backend/sdks";
import type { NextRequest } from "next/server";
import { innerRequest } from "./handler";
import { db } from "@backend/db";

export const GET = (
  _req: NextRequest,
  { params }: { params: { linkId: string } },
) => innerRequest({ redis, db, params });
