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
      username: "",
      password: "",
    },
  });
  const initAccountSessionMutation =
    api.accounts.initAccountSession.useMutation();
  const requestSessionMutation = api.accounts.requestSession.useMutation();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  form.useValidate(({ values, touched }) => {
    if (touched.username) {
      if (!z.string().email().safeParse(values.username).success) {
        form.setError(form.names.username, `Field is not a valid email`);
        return;
      }
      if (!values.username.endsWith("@getstuff.cc")) {
        form.setError(form.names.username, `Required to end with @getstuff.cc`);
        return;
      }
      if (!z.string().min(15).safeParse(values.username).success) {
        form.setError(
          form.names.username,
          `Username should be atleast 3 characters`,
        );
        return;
      }
    }
    if (touched.password) {
      if (!z.string().min(8).safeParse(values.password).success) {
        form.setError(
          form.names.password,
          `Password should be atleast 8 characters`,
        );
        return;
      }
    }
  });

  form.useSubmit(async ({ values: { password, username: username_EMAIL } }) => {
    setIsLoading(true);
    const username = username_EMAIL.replace("@getstuff.cc", "");

    const { salt, serverEphemeralPublic } =
      await initAccountSessionMutation.mutateAsync({ username });

    const hashedPassword = await generateMasterSecret(password, salt);

    const { clientEpheremal, clientSession } = await createSession({
      salt,
      username,
      password: hashedPassword,
      serverEphemeralPublic,
    });

    try {
      await requestSessionMutation.mutateAsync({
        username,
        clientEpheremalPublic: clientEpheremal.public,
        clientSessionProof: clientSession.proof,
      });

      const passwordDerivedSecret = await createPasswordDerivedSecret(
        hashedPassword,
        salt,
      );
      setPasswordDerivedSecret(passwordDerivedSecret.toString("hex"));

      router.push("/mail/inbox");
    } catch (error) {
      form.setError(form.names.username, "Invalid credentials");
      setIsLoading(false);
    }
    setIsLoading(false);
  });

  return (
    <Form.Root
      store={form}
      className={cn(
        stack({ direction: "col", gap: "md" }),
        css({ bg: "bgComponent", p: "large" }),
        border({ rounded: "radius", color: "interactive", side: "all" }),
      )}
    >
      <Form.Field name={form.names.username.toString()} type="text" />
      <Form.Field name={form.names.password.toString()} type="password" />
      <Button type="submit" variant="primary" size="md" disabled={isLoading}>
        Submit
        {isLoading && <Spinner size={20} />}
      </Button>
    </Form.Root>
  );
};
