import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import config from "./drizzle.config";

const client = postgres(config.dbCredentials.connectionString);

await migrate(drizzle(client), { migrationsFolder: config.out });
await client.end();
