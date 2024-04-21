"use client";

import { randomBytes } from "crypto";
import { vanillaApi } from "@stuff/api-client/vanilla";
import { userDataInterface } from "@stuff/client/interfaces";
import { encryptSymmetric, genKeyPair } from "@stuff/lib/crypto";
import { setPasswordDerivedSecret } from "@stuff/lib/useUserPrivateKey";
import { Button } from "@stuff/ui/button";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/navigation";
import { Form } from "packages/ui/components";
import {
  deriveSession,
  deriveVerifier,
  generateEphemeral,
  generateSalt,
} from "secure-remote-password/client";
import { toast } from "sonner";
import { border } from "src/components/recipies";
import { z } from "zod";
import {
  createPasswordDerivedSecret,
  createSRPPrivateKey,
  generateMasterSecret,
} from "../../_utils";
import { Spinner } from "../../icons/spinner";

export const FormInput = () => {
  const router = useRouter();

  const form = Form.useStore({
    defaultValues: {
      name: "",
      email: "",
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

  form.useSubmit(async ({ values: data }) => {
    form.setState("submitting", true);
    await vanillaApi.accounts.createAccount.mutate({
      email: data.email,
      name: data.name,
    });
    await vanillaApi.accounts.initLoginLink.mutate({
      email: data.email,
    });
  });

  const { submitting } = form.useState();

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
        disabled={submitting}
      >
        Submit {submitting && <Spinner size={20} />}
      </Button>
    </Form.Root>
  );
};
