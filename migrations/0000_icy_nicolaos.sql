DO $$ BEGIN
 CREATE TYPE "customer_status_enum" AS ENUM('active', 'inactive', 'canceled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"profile_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"customer_id" text NOT NULL,
	"customer_status" "customer_status_enum" NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_customer_id_unique" UNIQUE("customer_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quick_aliases" (
	"username" text NOT NULL,
	"mail_alias" text PRIMARY KEY NOT NULL,
	"enabled" boolean,
	"label" text,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "quick_aliases_mail_alias_unique" UNIQUE("mail_alias")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quick_aliases" ADD CONSTRAINT "quick_aliases_username_user_user_id_fk" FOREIGN KEY ("username") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
