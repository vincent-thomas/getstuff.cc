"use client";

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
import { useAction } from "next-safe-action/hooks";
import { createAliasAction } from "../actions/create-alias";

export const CreateAliasButton = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const { execute } = useAction(createAliasAction, {
    onSuccess(data) {
      router.push(`/a/${data.aliasId}`);
      toast.success("Alias created");
      setOpen(false);
    },
    onError() {
      toast.error(
        "Maximum aliases exceeded on the free tier, upgrade to get more",
      );
      setOpen(false);
    },
  });
  const form = Form.useStore({ defaultValues: { label: "" } });

  form.useValidate(({ values }) => {
    if (!z.string().min(3).safeParse(values.label).success) {
      form.setError(form.names.label, "Label atleast 3 chars");
      return;
    }
  });

  form.useSubmit(({ values }) => execute({ label: values.label }));

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
