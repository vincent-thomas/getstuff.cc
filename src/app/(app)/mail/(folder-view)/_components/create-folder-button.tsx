"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@stuff/api-client/react";
import { Plus } from "lucide-react"
import { Button } from "packages/components/lib"
import { Flex } from "packages/components/lib/flex"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,Sheet } from "packages/components/lib/sheet"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formInterface = z.object({
  folderName: z.string().min(3)
})

export const CreateFolderButton = () => {
  const [open, setOpen] = useState(false);
  const createFolderMutation = api.mail.folders.createFolder.useMutation();
  const {register, handleSubmit} = useForm<z.infer<typeof formInterface>>({resolver: zodResolver(formInterface)});

  const onSubmit = handleSubmit(async ({folderName}) => {
    await createFolderMutation.mutateAsync({name: folderName});
    setOpen(false);
  })

  return (
    <Sheet open={open}>
      <SheetTrigger asChild onClick={() => setOpen(true)}>
        <button className="rounded-full p-1 p-1 hover:bg-accent">
          <Plus />
        </button>
      </SheetTrigger>
      <SheetContent side="left" onClosePress={() => setOpen(false)}>
        <SheetHeader>
          <SheetTitle>Create Folder</SheetTitle>
          <SheetDescription>
            Folder is a place to store your emails. You can use it to
            categorize your emails.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={onSubmit}>
        <Flex col gap="0.5rem" className="py-2">
          <label htmlFor="folder-name">Folder Name</label>
          <input
            placeholder="..."
            {...register("folderName")}            className="rounded-md px-4 py-3 outline-none"
          />
          <div className="pt-2">
            <Button type="submit" loading={createFolderMutation.isLoading}>Create folder</Button>
          </div>
        </Flex>
        </form>

      </SheetContent>
    </Sheet>
  )
}