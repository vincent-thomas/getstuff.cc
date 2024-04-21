"use client";

import { api } from "@stuff/api-client/react";
import { cn } from "@stuff/components/utils";
import { setPasswordDerivedSecret } from "@stuff/lib/useUserPrivateKey";
import { Button } from "@stuff/ui/button";
import { useRouter } from "next/navigation";
import { Form } from "packages/ui/components";
import { useState } from "react";
import {
  deriveSession,
  generateEphemeral,
} from "secure-remote-password/client";
import { border, stack } from "src/components/recipies";
import { z } from "zod";
import {
  createPasswordDerivedSecret,
  createSRPPrivateKey,
  generateMasterSecret,
} from "../../_utils";
import { Spinner } from "../../icons/spinner";

const createSession = async ({
  salt,
  password,
  username,
  serverEphemeralPublic,
}: {
  password: string;
  salt: string;
  serverEphemeralPublic: string;
  username: string;
}) => {
  const verifierPrivateKey = await createSRPPrivateKey(password, salt);
  const clientEpheremal = generateEphemeral();

  return {
    clientSession: deriveSession(
      clientEpheremal.secret,
      serverEphemeralPublic,
      salt,
      username,
      verifierPrivateKey,
    ),
    clientEpheremal,
  };
};

export const FormInput = () => {
  const form = Form.useStore({
    defaultValues: {
      email: "",
    },
  });
  const initAccountSessionMutation = api.accounts.initLoginLink.useMutation();

  form.useValidate(({ values, touched }) => {
    if (touched.email) {
      if (!z.string().email().safeParse(values.email).success) {
        form.setError(form.names.email, "Field is not a valid email");
        return;
      }
    }
  });

  form.useSubmit(async ({ values: { email } }) => {
    await initAccountSessionMutation.mutateAsync({ email });
  });

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
