ALTER TYPE "customer_status_enum" ADD VALUE 'canceled';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "customer_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "salt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "public_key" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "srp_verifier" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "encrypted_user_data" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "encrypted_user_data_key" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ALTER COLUMN "customer_status" SET NOT NULL;