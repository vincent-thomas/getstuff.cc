DO $$ BEGIN
 CREATE TYPE "customer_status_enum" AS ENUM('active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'trialing', 'unpaid', 'paused');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"subscription_id" text PRIMARY KEY NOT NULL,
	"stripe_subscription_id" text NOT NULL,
	"customer_id" text NOT NULL,
	"customer_status" "customer_status_enum" NOT NULL,
	"canceled_at" timestamp,
	"start_date" timestamp NOT NULL,
	"current_period_start" timestamp NOT NULL,
	"current_period_end" timestamp NOT NULL
);
