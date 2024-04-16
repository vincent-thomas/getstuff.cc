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
import type { z } from "zod";
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
      username: "",
      name: "",
      password: "",
      password2: "",
    },
  });

  form.useValidate(state => {
    const values = state.values;

    if (values.password !== values.password2) {
      form.setError(form.names.password2, "Password is not the same");
      return;
    }
  });

  form.useSubmit(async ({ values: data }) => {
    form.setState("submitting", true);
    const salt = generateSalt();
    const masterSecret = await generateMasterSecret(data.password, salt);
    // 1/2 Keys generated from masterSecret
    const verifierPrivateKey = await createSRPPrivateKey(masterSecret, salt);
    const verifier = deriveVerifier(verifierPrivateKey);
    const passwordDerivedSecret = await createPasswordDerivedSecret(
      masterSecret,
      salt,
    );
    const defaultUserData = userDataInterface.parse({
      theme: "dark",
      avatar_url: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${Buffer.from(
        randomBytes(4),
      ).toString("hex")}`,
    } satisfies z.infer<typeof userDataInterface>);
    const { publicKey, privateKey } = genKeyPair();
    const encryptedData = encryptSymmetric(
      Buffer.from(JSON.stringify(defaultUserData)),
      passwordDerivedSecret,
    );
    const encryptedPrivateKey = encryptSymmetric(
      Buffer.from(privateKey),
      passwordDerivedSecret,
    );

    const encryptedUserData = encryptedData.toString("hex");

    try {
      await vanillaApi.accounts.createAccount.mutate({
        username: data.username,
        name: data.name,
        verifier,
        salt,
        encryptedDataKey: encryptedPrivateKey.toString("hex"),
        encryptedUserData,
        publicKey,
      });
      const { serverEphemeralPublic } =
        await vanillaApi.accounts.initAccountSession.mutate({
          username: data.username,
        });
      const clientEpheremal = generateEphemeral();
      const clientSession = deriveSession(
        clientEpheremal.secret,
        serverEphemeralPublic,
        salt,
        data.username,
        verifierPrivateKey,
      );
      await vanillaApi.accounts.requestSession.mutate({
        username: data.username,
        clientEpheremalPublic: clientEpheremal.public,
        clientSessionProof: clientSession.proof,
      });
      setPasswordDerivedSecret(passwordDerivedSecret.toString("hex"));

      router.push("/mail/inbox");
    } catch (e) {
      if (e instanceof TRPCClientError) {
        toast.error(e.message);
        form.setState("submitting", false);
      }
    }
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
      <Form.Field
        name={form.names.username}
        type="text"
        required
        minLength={3}
      />
      <Form.Field name={form.names.name} type="text" required minLength={2} />
      <Form.Field
        name={form.names.password}
        type="password"
        required
        minLength={8}
      />
      <Form.Field name={form.names.password2} type="password" required />

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
