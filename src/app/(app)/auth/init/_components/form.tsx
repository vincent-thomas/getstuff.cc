"use client";

import type { z } from "zod";
import { useState } from "react";
import { api } from "@stuff/api-client/react";
import {
	generateSalt,
	deriveVerifier,
	generateEphemeral,
	deriveSession,
} from "secure-remote-password/client";
import {
	createPasswordDerivedSecret,
	createSRPPrivateKey,
	generateMasterSecret,
} from "../../_utils";
import { randomBytes } from "crypto";
import { userDataInterface } from "@stuff/client/interfaces";
import {
	deserializeData,
	encryptSymmetric,
	genKeyPair,
} from "@stuff/lib/crypto";
import { Button } from "@stuff/ui/button";
import { setPasswordDerivedSecret } from "@stuff/lib/useUserPrivateKey";
import { useRouter } from "next/navigation";
import { Form } from "packages/ui/components";
import { border } from "src/components/recipies";
import { Spinner } from "../../icons/spinner";

export const FormInput = () => {
	const [loading, setLoading] = useState(false);

	const _createAccountMutation = api.accounts.createAccount.useMutation();
	const requestSessionMutation = api.accounts.requestSession.useMutation();
	const initAccountSessionMutation =
		api.accounts.initAccountSession.useMutation();

	const router = useRouter();

	const form = Form.useStore({
		defaultValues: {
			username: "",
			name: "",
			password: "",
			password2: "",
		},
	});

	form.useValidate((state) => {
		const values = state.values;

		if (values.password !== values.password2) {
			form.setError(form.names.password2, "Password is not the same");
			return;
		}
	});

	form.useSubmit(async ({ values: data }) => {
		setLoading(true);
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
			deserializeData(Buffer.from(JSON.stringify(defaultUserData))),
			passwordDerivedSecret,
		);
		const encryptedPrivateKey = encryptSymmetric(
			deserializeData(Buffer.from(privateKey)),
			passwordDerivedSecret,
		);
		await _createAccountMutation.mutateAsync({
			username: data.username,
			name: data.name,
			verifier,
			salt,
			encryptedDataKey: encryptedPrivateKey,
			encryptedUserData: encryptedData,
			publicKey,
		});
		const { serverEphemeralPublic } =
			await initAccountSessionMutation.mutateAsync({ username: data.username });
		const clientEpheremal = generateEphemeral();
		const clientSession = deriveSession(
			clientEpheremal.secret,
			serverEphemeralPublic,
			salt,
			data.username,
			verifierPrivateKey,
		);
		await requestSessionMutation.mutateAsync({
			username: data.username,
			clientEpheremalPublic: clientEpheremal.public,
			clientSessionProof: clientSession.proof,
		});
		setPasswordDerivedSecret(passwordDerivedSecret.toString("hex"));
		router.push("/mail/inbox");
	});

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

			<Button type="submit">Submit {loading && <Spinner size={20} />}</Button>
		</Form.Root>
	);
};
