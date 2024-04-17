DO $$ BEGIN
 ALTER TABLE "thread_view" ADD CONSTRAINT "thread_view_folder_id_folders_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "folders"("folder_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
