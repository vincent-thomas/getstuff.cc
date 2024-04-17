DO $$ BEGIN
 ALTER TABLE "thread_view" ADD CONSTRAINT "thread_view_thread_id_thread_thread_id_fk" FOREIGN KEY ("thread_id") REFERENCES "thread"("thread_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
