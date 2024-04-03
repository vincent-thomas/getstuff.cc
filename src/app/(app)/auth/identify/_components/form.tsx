"use client";

import { Button } from "@stuff/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useReducer, useState } from "react";
import { api } from "@stuff/api-client/react";
import {
	generateEphemeral,
	deriveSession,
} from "secure-remote-password/client";
import {
	createPasswordDerivedSecret,
	createSRPPrivateKey,
	generateMasterSecret,
} from "../../_utils";
import { MailInput, PasswordInput } from "../../_components/inputs";
import { useRouter } from "next/navigation";
import { setPasswordDerivedSecret } from "@stuff/lib/useUserPrivateKey";
import { cn } from "@stuff/components/utils";
import { stack } from "src/components/recipies";
import { Loading } from "@stuff/icons/loading";
import { colors } from "packages/ui/theme";

const validator = z.object({
	username: z.string(),
	password: z.string().min(8),
});

type State = "INPUT_CREDENTIALS" | "INPUT_OTP";

const reducer = (previousState: State): State => {
	if (previousState === "INPUT_CREDENTIALS") {
		return "INPUT_OTP";
	}
	return "INPUT_CREDENTIALS";
};

export const Form = () => {
	const [state] = useReducer(reducer, "INPUT_CREDENTIALS");
	const initAccountSessionMutation =
		api.accounts.initAccountSession.useMutation();
	const requestSessionMutation = api.accounts.requestSession.useMutation();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log("STATE", state);
	}, [state]);

	const { register, handleSubmit, setError } = useForm<
		z.infer<typeof validator>
	>({ resolver: zodResolver(validator) });

	if (state === "INPUT_CREDENTIALS") {
		return (
			<form
				onSubmit={handleSubmit(async ({ username, password }) => {
					setLoading(true);
					const { salt, serverEphemeralPublic } =
						await initAccountSessionMutation.mutateAsync({ username });

					const hashedPassword = await generateMasterSecret(password, salt);

					const verifierPrivateKey = await createSRPPrivateKey(
						hashedPassword,
						salt,
					);
					const clientEpheremal = generateEphemeral();
					const clientSession = deriveSession(
						clientEpheremal.secret,
						serverEphemeralPublic,
						salt,
						username,
						verifierPrivateKey,
					);

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
						console.log(error);
						setError("username", { message: "Invalid credentials" });
						setLoading(false);
					}
					setLoading(false);
				})}
				className={cn(stack({ direction: "col", gap: "md" }))}
			>
				<MailInput {...register("username")} />
				<PasswordInput {...register("password")} />
				<Button size="lg" variant="primary">
					Submit
					{loading && <Loading size={16} color={colors.accentForeground} />}
				</Button>
			</form>
		);
	}

	return <></>;

	// const { register, handleSubmit } = useForm<z.infer<typeof validator>>({
	//   resolver: zodResolver(validator)
	// });
	// const [invalidCredentials, setInvalidCredentials] = useState(false);
	// const [isLoading, setLoading] = useState(false);

	// const initAccountSessionMutation =
	//   api.accounts.initAccountSession.useMutation();
	// const requestSessionMutation = api.accounts.requestSession.useMutation();

	// const onSubmit = handleSubmit(async data => {
	//   setLoading(true);
	//   setInvalidCredentials(false);
	//   const { salt, serverEphemeralPublic } =
	//     await initAccountSessionMutation.mutateAsync({
	//       username: data.username
	//     });

	//   const hashedPassword = await generateMasterSecret(data.password, salt);

	//   const verifierPrivateKey = await createSRPPrivateKey(hashedPassword, salt);

	//   const clientEpheremal = generateEphemeral();

	//   const clientSession = deriveSession(
	//     clientEpheremal.secret,
	//     serverEphemeralPublic,
	//     salt,
	//     data.username,
	//     verifierPrivateKey
	//   );

	//   try {
	//     await requestSessionMutation.mutateAsync({
	//       username: data.username,
	//       clientEpheremalPublic: clientEpheremal.public,
	//       clientSessionProof: clientSession.proof
	//     });

	//     const passwordDerivedSecret = await createPasswordDerivedSecret(
	//       hashedPassword,
	//       salt
	//     );
	//     setPasswordDerivedSecret(passwordDerivedSecret.toString("hex"));

	//     router.push("/mail/inbox");
	//   } catch (error) {
	//     console.log(error);
	//     setInvalidCredentials(true);
	//     setLoading(false);
	//   }
	// });
	// const router = useRouter();
};

export const EmailStage = ({
	whenDone,
}: { whenDone: false | ((email: string) => Promise<void>) }) => {
	// const [state, reducer] = useReducer((prevState: string | false, incomingEmail: string) => {
	//   if (!z.string().email().safeParse(prevState).success) {
	//     return false
	//   }

	//   return incomingEmail
	// }, "");

	return <MailInput locked={whenDone === false} />;
};
