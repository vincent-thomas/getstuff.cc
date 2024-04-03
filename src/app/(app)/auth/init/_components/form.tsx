"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Checkbox } from "packages/components/lib/checkbox";
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
import { MailInput, NameInput, PasswordInput } from "../../_components/inputs";
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
import { Loading } from "@stuff/icons/loading";
import { colors } from "packages/ui/theme";

// const QRCODE_SIZE = "100%"
// const QRCODE_LEVEL = 'Q'
// const QRCODE_BORDER = 1

// const QRCodeComponent = ({ value }: {value: string }) => {
//   const { path, viewBox } = useQRCodeGenerator(value, QRCODE_LEVEL, QRCODE_BORDER)

//   return (
//     <svg
//       width={QRCODE_SIZE}
//       height={QRCODE_SIZE}
//       viewBox={viewBox}
//       stroke='none'
//     >
//       <rect width='100%' height='100%' fill='#ffffff' />
//       <path d={path} fill='#000000' />
//     </svg>
//   )
// }

const validator = z.object({
	username: z.string(),
	name: z.string(),
	password: z.string().min(8),
	samePassword: z.string().min(8),
	checkbox: z.any(),
});

export const Form = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<z.infer<typeof validator>>({
		resolver: zodResolver(validator),
	});
	// const [userToSignUp, setUserToSignUp] = useState<{
	//   user: {
	//     username: string,
	//     name: string,
	//     verifier: string,
	//     salt: string,
	//     encryptedDataKey: string,
	//     encryptedUserData: string,
	//     publicKey: string
	//   },
	//   totp: {
	//     secret: string,
	//     uri: string
	//   }
	//   }>();

	const _createAccountMutation = api.accounts.createAccount.useMutation();
	const requestSessionMutation = api.accounts.requestSession.useMutation();
	const initAccountSessionMutation =
		api.accounts.initAccountSession.useMutation();

	const [isClicked, setClicked] = useState(false);
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		if (!isClicked) {
			setError("checkbox", {
				message: "You must accept the terms and conditions",
			});
			return;
		}

		if (data.password !== data.samePassword) {
			setError("samePassword", {
				message: "Passwords do not match",
			});
			return;
		}
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

		// const secret = generateSecret({
		//   length: 20,
		//   issuer: "Stuff",
		//   name: data.username
		// })

		// setUserToSignUp({
		//   user: {
		//     username: data.username,
		//     name: data.name,
		//     verifier,
		//     salt,
		//     encryptedDataKey: encryptedPrivateKey,
		//     encryptedUserData: encryptedData,
		//     publicKey
		//   },
		//   totp: {
		//     secret: secret.base32,
		//     uri: secret.otpauth_url
		//   }
		// })
	});

	// const {register: register2, handleSubmit: handleSubmit2} = useForm<{qr: string}>()

	// if (userToSignUp !== undefined) {
	//   return (
	//     <>
	//       <QRCodeComponent value={userToSignUp.totp.uri} />
	//       <form onSubmit={handleSubmit2(async ({qr}) => {
	//             const result = totp.verify({
	//               token: qr,
	//               secret: userToSignUp.totp.secret,
	//               encoding: "base32"
	//             });
	//             console.log(result)
	//       })}>
	//         <Flex col gap="0.5rem" align="start">
	//           <label htmlFor="test">Validate</label>
	//           <input {...register2("qr")} className="p-2 bg-background2 rounded-md border-border border w-full outline-1 outline-offset-2 focus:outline outline-border" placeholder="2FA code" name="test" />
	//         </Flex>
	//         <Button variant="primary">Create user</Button>
	//       </form>
	//     </>
	//   )
	// }

	return (
		<form className="flex flex-col gap-4" onSubmit={onSubmit}>
			{errors.username?.message && (
				<div className="rounded-md bg-red-500 p-4">
					{errors.username.message}
				</div>
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
			<Button variant="primary" disabled={!!errors.root}>
				Submit{" "}
				{loading && <Loading size={18} color={colors.accentForeground} />}
			</Button>
		</form>
	);
};
