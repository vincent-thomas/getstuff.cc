"use client";

import { cn } from "@stuff/components/utils";
import { Button } from "@stuff/ui/button";
import { Form } from "packages/ui/components";
import { border, stack } from "src/components/recipies";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { Spinner } from "../../icons/spinner";
import { sendMagicLinkAction } from "./login-action";
import { toast } from "sonner";

export const FormInput = () => {
  const form = Form.useStore({
    defaultValues: {
      email: "",
    },
  });
  const { execute } = useAction(sendMagicLinkAction, {
    onSuccess() {
      toast.info(
        "A link has been sent to the email address, to login click the link in that email",
      );
    },
  });

  form.useValidate(({ values, touched }) => {
    if (touched.email) {
      if (!z.string().email().safeParse(values.email).success) {
        form.setError(form.names.email, "Field is not a valid email");
        return;
      }
    }
  });

  form.useSubmit(({ values: { email } }) => execute({ email }));

  const isLoading = form.useState().submitting;

  return (
    <Form.Root
      store={form}
      className={cn(
        stack({ direction: "col", gap: "md" }),
        css({ bg: "bgComponent", p: "large" }),
        border({ rounded: "radius", color: "interactive", side: "all" }),
      )}
    >
      <Form.Field name={form.names.email.toString()} type="text" />
      <Button type="submit" variant="primary" size="md" disabled={isLoading}>
        Submit
        {isLoading && <Spinner size={20} />}
      </Button>
    </Form.Root>
  );
};
