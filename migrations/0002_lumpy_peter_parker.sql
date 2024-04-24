ALTER TABLE "quick_aliases" ALTER COLUMN "enabled" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "when_canceled" timestamp;