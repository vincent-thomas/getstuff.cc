import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const dbPgClient = postgres(env.DATABASE_URL);

export const db = drizzle(dbPgClient, { schema });
