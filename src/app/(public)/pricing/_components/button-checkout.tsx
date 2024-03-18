"use client";

import { api } from "@stuff/api-client/react"
import { Button } from "@stuff/ui/button";


export const CheckoutButton = () => {
  const checkoutMutation = api.customer.checkout.useMutation();
 
  return <Button onClick={async () => {
    const result = await checkoutMutation.mutateAsync();
    window.location.href = result.sessionUrl;
  }} loading={checkoutMutation.isLoading}>Get Stuff+</Button>
}