"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@stuff/api-client/react";
import { Loading } from "@stuff/icons/loading";
import { Flex } from "@stuff/structure";
import { Button } from "@stuff/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "packages/ui/components/dialog/dialog";
import { palette } from "packages/ui/theme";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formInterface = z.object({
  folderName: z.string().min(3),
});

export const CreateFolderButton = () => {
  const [open, setOpen] = useState(false);
  const createFolderMutation = api.mail.folders.createFolder.useMutation();
  const { register, handleSubmit } = useForm<z.infer<typeof formInterface>>({
    resolver: zodResolver(formInterface),
  });

  const onSubmit = handleSubmit(async ({ folderName }) => {
    await createFolderMutation.mutateAsync({ name: folderName });
    setOpen(false);
  });

  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <button className="rounded-full p-1 p-1 hover:bg-hover">
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent
        size="md"
        onClosePress={() => {
          setOpen(false);
        }}
      >
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
          <DialogDescription>
            Folder is a place to store your emails. You can use it to categorize
            your emails.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <Flex col gap="0.5rem" className="py-2">
            <label htmlFor="folder-name">Folder Name</label>
            <input
              placeholder="..."
              {...register("folderName")}
              className="rounded-md px-4 py-3 outline-none"
            />
            <div className="pt-2">
              <Button type="submit">
                Create folder{" "}
                {createFolderMutation.isLoading && (
                  <Loading size={16} color={palette.text2} />
                )}
              </Button>
            </div>
          </Flex>
        </form>
      </DialogContent>
    </Dialog>
  );
};
