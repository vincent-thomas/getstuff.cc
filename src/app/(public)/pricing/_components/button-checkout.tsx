"use client";

import { api } from "@stuff/api-client/react";
import { Loading } from "@stuff/icons/loading";
import { Button } from "@stuff/ui/button";
import { colors } from "packages/ui/theme";

export const CheckoutButton = () => {
	const checkoutMutation = api.customer.checkout.useMutation();

	return (
		<Button
			onClick={async () => {
				const result = await checkoutMutation.mutateAsync();
				window.location.href = result.sessionUrl;
			}}
		>
			Get Stuff+{" "}
			{checkoutMutation.isLoading && (
				<Loading size={18} color={colors.accentForeground} />
			)}
		</Button>
	);
};
