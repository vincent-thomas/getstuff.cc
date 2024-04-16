DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_customer_id_customer_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
