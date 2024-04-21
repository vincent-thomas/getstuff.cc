"use client";

import { api } from "@stuff/api-client/react";
import { Button } from "@stuff/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../../packages/ui/components/dialog";
import { Form } from "packages/ui/components";
import { z } from "zod";
import { toast } from "sonner";
import { Spinner } from "../../auth/icons/spinner";
import { useState } from "react";
export const CreateAliasButton = () => {
  const test = api.mailRelay.createAlias.useMutation();
  const form = Form.useStore({ defaultValues: { label: "" } });

  const [isOpen, setOpen] = useState(false);

  form.useValidate(({ values }) => {
    if (!z.string().min(3).safeParse(values.label).success) {
      form.setError(form.names.label, "Label atleast 3 chars");
      return;
    }
  });

  form.useSubmit(async ({ values }) => {
    await test.mutateAsync({
      label: values.label,
    });
    setOpen(false);
    toast.success("Alias created");
  });

  const isLoading = form.useState().submitting;

  return (
    <Dialog open={isOpen} onOpenChange={state => setOpen(state)}>
      <DialogTrigger asChild>
        <Button variant="primary" size="md" rounded="medium">
          Create Alias
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        size="md"
        className={cn(css({ p: "medium" }))}
        mainTitle="Create Alias"
      >
        <Form.Root
          store={form}
          className={cn(
            stack({ direction: "col", gap: "md" }),
            css({ marginTop: "medium" }),
          )}
        >
          <Form.Field name={form.names.label} type="text" />
          <Button
            type="submit"
            variant="primary"
            size="md"
            rounded="medium"
            disabled={isLoading}
          >
            Submit
            {isLoading && <Spinner size={18} />}
          </Button>
        </Form.Root>
      </DialogContent>
    </Dialog>
  );
};
