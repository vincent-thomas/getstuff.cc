DO $$ BEGIN
 CREATE TYPE "customer_status_enum" AS ENUM('active', 'inactive', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"customer_id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"customer_status" "customer_status_enum"
);
