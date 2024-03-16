"use client";

import { Button } from "packages/components/lib/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Checkbox } from "packages/components/lib/checkbox";
import { api } from "@stuff/api-client/react";
import { generateSalt, deriveVerifier } from "secure-remote-password/client";
import {
  createPasswordDerivedSecret,
  createSRPPrivateKey,
  generateMasterSecret
} from "../../_utils";
import { deserializeData, encryptSymmetric } from "@/lib/sym-crypto";
import { userDataInterface } from "@/interfaces/userData";
import { MailInput, NameInput, PasswordInput } from "../../_components/inputs";
import { randomBytes } from "crypto";
import { genKeyPair } from "@/lib/asym-crypto";

const validator = z.object({
  username: z.string(),
  name: z.string(),
  password: z.string().min(8),
  samePassword: z.string().min(8),
  checkbox: z.any()
});

export const Form = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator)
  });

  const createAccountMutation = api.accounts.createAccount.useMutation();

  const [isClicked, setClicked] = useState(false);

  const onSubmit = handleSubmit(async data => {
    if (!isClicked) {
      setError("checkbox", {
        message: "You must accept the terms and conditions"
      });
      return;
    }

    if (data.password !== data.samePassword) {
      setError("samePassword", {
        message: "Passwords do not match"
      });
      return;
    }

    const salt = generateSalt();

    const masterSecret = await generateMasterSecret(data.password, salt);

    // 1/2 Keys generated from masterSecret
    const verifierPrivateKey = await createSRPPrivateKey(masterSecret, salt);
    const verifier = deriveVerifier(verifierPrivateKey);

    const passwordDerivedSecret = await createPasswordDerivedSecret(
      masterSecret,
      salt
    );

    const defaultUserData = userDataInterface.parse({
      theme: "dark",
      avatar_url: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${Buffer.from(
        randomBytes(4)
      ).toString("hex")}`
    } satisfies z.infer<typeof userDataInterface>);

    const { publicKey, privateKey } = genKeyPair();

    const encryptedData = encryptSymmetric(
      deserializeData(Buffer.from(JSON.stringify(defaultUserData))),
      passwordDerivedSecret
    );

    const encryptedPrivateKey = encryptSymmetric(
      deserializeData(Buffer.from(privateKey)),
      passwordDerivedSecret
    );

    try {
      await createAccountMutation.mutateAsync({
        username: data.username,
        name: data.name,
        verifier,
        salt,
        encryptedDataKey: encryptedPrivateKey,
        encryptedUserData: encryptedData,
        publicKey
      });
    } catch(e) {
      setError("username", {
        message: "Invalid credentials"
      });
    }


  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {errors.username?.message && (
        <div className="rounded-md bg-red-500 p-4">{errors.username.message}</div>
      )}
      <MailInput {...register("username")} autoComplete="username" />
      <NameInput {...register("name")} autoComplete="given-name" />
      <PasswordInput {...register("password")} autoComplete="new-password" />
      <PasswordInput
        repeat
        {...register("samePassword")}
        autoComplete="new-password"
      />
      <div className="flex items-center gap-2">
        <Checkbox onClick={() => setClicked(!isClicked)} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
      <div className="self-start">
        {typeof errors.checkbox?.message === "string" && (
          <span className="text-red-400">{errors.checkbox.message}</span>
        )}
      </div>
      <Button variant="default" disabled={!!errors.root}>Submit</Button>
    </form>
  );
};
