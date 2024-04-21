import config from "./drizzle.config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const client = postgres(config.dbCredentials.connectionString);
await migrate(drizzle(client), { migrationsFolder: config.out });
