"use client";

import { Button } from "packages/components/lib/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { api } from "@stuff/api-client/react";
import {
  generateEphemeral,
  deriveSession
} from "secure-remote-password/client";
import {
  createPasswordDerivedSecret,
  createSRPPrivateKey,
  generateMasterSecret
} from "../../_utils";
import { MailInput, PasswordInput } from "../../_components/inputs";
import { useRouter } from "next/navigation";

const validator = z.object({
  username: z.string(),
  password: z.string().min(8)
});

export const Form = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator)
  });
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const initAccountSessionMutation =
    api.accounts.initAccountSession.useMutation();
  const requestSessionMutation = api.accounts.requestSession.useMutation();

  const onSubmit = handleSubmit(async data => {
    setLoading(true);
    setInvalidCredentials(false);
    const { salt, serverEphemeralPublic } =
      await initAccountSessionMutation.mutateAsync({
        username: data.username
      });

    const hashedPassword = await generateMasterSecret(data.password, salt);

    const verifierPrivateKey = await createSRPPrivateKey(hashedPassword, salt);

    const clientEpheremal = generateEphemeral();

    const clientSession = deriveSession(
      clientEpheremal.secret,
      serverEphemeralPublic,
      salt,
      data.username,
      verifierPrivateKey
    );

    try {
      await requestSessionMutation.mutateAsync({
        username: data.username,
        clientEpheremalPublic: clientEpheremal.public,
        clientSessionProof: clientSession.proof
      });

      const passwordDerivedSecret = await createPasswordDerivedSecret(
        hashedPassword,
        salt
      );
      sessionStorage.setItem(
        "password_derived_secret",
        passwordDerivedSecret.toString("hex")
      );

      router.push("/mail/inbox");
    } catch (error) {
      setInvalidCredentials(true);
      setLoading(false);
    }
  });
  const router = useRouter();

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {invalidCredentials && (
        <div className="rounded-md bg-red-500 p-4">Invalid credentials</div>
      )}
      <MailInput {...register("username")} />
      <PasswordInput {...register("password")} />
      <Button variant="default" loading={isLoading} size="lg">
        Submit
      </Button>
    </form>
  );
};
