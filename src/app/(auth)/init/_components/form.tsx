"use client";

import { Button } from "@stuff/ui/button";
import { Form } from "packages/ui/components";

import { border } from "src/components/recipies";
import { z } from "zod";

import { Spinner } from "../../icons/spinner";
import { useAction } from "next-safe-action/hooks";
import { createUserAction } from "./create-user.action";
import { toast } from "sonner";

export const FormInput = () => {
  const form = Form.useStore({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { execute, status } = useAction(createUserAction, {
    onSuccess() {
      toast("A link has been sent to your email address");
    },
  });

  form.useValidate(state => {
    const values = state.values;

    if (!z.string().email().safeParse(values.email).success) {
      form.setError(form.names.email, "Invalid email");
    }

    if (!z.string().min(3).safeParse(values.name).success) {
      form.setError(form.names.name, "Atleast 3 chars");
    }
  });

  form.useSubmit(({ values: { email, name } }) => execute({ name, email }));

  return (
    <Form.Root
      store={form}
      className={cn(
        stack({ direction: "col", gap: "md" }),
        css({ p: "medium", bg: "bgComponent" }),
        border({ rounded: "radius", color: "interactive", side: "all" }),
      )}
    >
      <Form.Field name={form.names.name} type="text" />
      <Form.Field name={form.names.email} type="text" />
      <Button
        variant="primary"
        rounded="medium"
        size="md"
        type="submit"
        disabled={status === "executing"}
      >
        Submit {status === "executing" && <Spinner size={20} />}
      </Button>
    </Form.Root>
  );
};
