CREATE TABLE IF NOT EXISTS "usages" (
	"usage_id" text PRIMARY KEY NOT NULL,
	"customer_id" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usages" ADD CONSTRAINT "usages_customer_id_user_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "user"("customer_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
