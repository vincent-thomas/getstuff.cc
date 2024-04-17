import { pgTable, text, unique } from "drizzle-orm/pg-core";

export const contactTable = pgTable(
  "contact",
  {
    contactId: text("contact_id").primaryKey(),
    ownerUsername: text("username").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    emailAddress: text("email_address").notNull(),
  },
  table => ({
    contactUser: unique("contact_user").on(
      table.emailAddress,
      table.ownerUsername,
    ),
  }),
);
