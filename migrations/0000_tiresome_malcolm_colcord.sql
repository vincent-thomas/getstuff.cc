DO $$ BEGIN
 CREATE TYPE "customer_status_enum" AS ENUM('active', 'inactive', 'canceled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_id" text NOT NULL,
	"name" text NOT NULL,
	"salt" text NOT NULL,
	"public_key" text NOT NULL,
	"srp_verifier" text NOT NULL,
	"encrypted_user_data" text NOT NULL,
	"encrypted_user_data_key" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_customer_id_unique" UNIQUE("customer_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"customer_id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"customer_status" "customer_status_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "folders" (
	"folder_id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"folder_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"parent_folder_id" text,
	CONSTRAINT "folders_username_folder_name_parent_folder_id_unique" UNIQUE("username","folder_name","parent_folder_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact" (
	"contact_id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email_address" text NOT NULL,
	CONSTRAINT "contact_user" UNIQUE("email_address","username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message" (
	"message_id" text PRIMARY KEY NOT NULL,
	"come_from_external" boolean NOT NULL,
	"sender" jsonb NOT NULL,
	"reciever_username" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quick_aliases" (
	"username" text NOT NULL,
	"mail_alias" text NOT NULL,
	"enabled" boolean,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "quick_aliases_mail_alias_unique" UNIQUE("mail_alias")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "thread" (
	"thread_id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "thread_view" (
	"username" text PRIMARY KEY NOT NULL,
	"folder_id" text NOT NULL,
	"thread_id" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"last_active" timestamp
);
