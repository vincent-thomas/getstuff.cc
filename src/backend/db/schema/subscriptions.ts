import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const customerStatus = pgEnum("customer_status_enum", [
  "active",
  "past_due",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "trialing",
  "unpaid",
  "paused",
]);

export const subscriptionTable = pgTable("subscriptions", {
  subscriptionId: text("subscription_id").primaryKey(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull(),
  customerId: text("customer_id").notNull(),
  status: customerStatus("customer_status").notNull(),
  canceled_at: timestamp("canceled_at"),
  startDate: timestamp("start_date").notNull(),
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
});
