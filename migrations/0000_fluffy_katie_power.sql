CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_id" text,
	"name" text,
	"salt" text,
	"public_key" text,
	"srp_verifier" text,
	"encrypted_user_data" text,
	"encrypted_user_data_key" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_customer_id_unique" UNIQUE("customer_id")
);
