import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const dbPgClient = neon(env.DATABASE_URL);

export const db = drizzle(dbPgClient, { schema, logger: true });
