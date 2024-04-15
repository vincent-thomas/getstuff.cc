"use client";
import { api } from "@stuff/api-client/react";
import { Loading } from "@stuff/icons/loading";
import { Button } from "@stuff/ui/button";
import { Plus } from "lucide-react";
import { Form } from "packages/ui/components";
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
import { z } from "zod";

export const CreateFolderButton = () => {
  const [open, setOpen] = useState(false);
  const createFolderMutation = api.mail.folders.createFolder.useMutation();

  const form = Form.useStore({
    defaultValues: {
      folderName: "",
    },
  });

  form.useValidate(({ values }) => {
    if (!z.string().min(3).safeParse(values.folderName).success) {
      form.setError(
        form.names.folderName,
        "Folder name can't be shorter than 3 characters",
      );
      return;
    }
  });

  form.useSubmit(async ({ values }) => {
    await createFolderMutation.mutateAsync({ name: values.folderName });
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
        <Form.Root>
          <div className={cn(stack({ direction: "col", gap: "md" }))}>
            <Form.Label name={form.names.folderName}>
              Folder Name
              <Form.Input
                placeholder="..."
                name={form.names.folderName}
                className="rounded-md px-4 py-3 outline-none"
              />
              <Form.Error name={form.names.folderName} />
            </Form.Label>
            <div className="pt-2">
              <Button type="submit">
                Create folder{" "}
                {createFolderMutation.isLoading && (
                  <Loading size={16} color={palette.text2} />
                )}
              </Button>
            </div>
          </div>
        </Form.Root>
      </DialogContent>
    </Dialog>
  );
};
