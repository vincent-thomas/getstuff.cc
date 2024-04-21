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
import { Spinner } from "../../../(auth)/icons/spinner";
import { useState } from "react";
import { P } from "@stuff/typography";
import { useRouter } from "next/navigation";

export const CreateAliasButton = () => {
  const test = api.mailRelay.createAlias.useMutation();
  const utils = api.useUtils();
  const form = Form.useStore({ defaultValues: { label: "" } });

  const [isOpen, setOpen] = useState(false);

  form.useValidate(({ values }) => {
    if (!z.string().min(3).safeParse(values.label).success) {
      form.setError(form.names.label, "Label atleast 3 chars");
      return;
    }
  });
  const router = useRouter();
  form.useSubmit(async ({ values }) => {
    const aliasId = await test.mutateAsync({
      label: values.label,
    });
    await utils.mailRelay.listAliases.invalidate();
    setOpen(false);
    router.push(`/a/${aliasId}`);
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
        <P
          style={{ maxWidth: "45ch" }}
          className={cn(css({ marginTop: "small" }))}
        >
          A Label can be anything from a website to a short descriptive meaning
          to a specific alias.
        </P>
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
