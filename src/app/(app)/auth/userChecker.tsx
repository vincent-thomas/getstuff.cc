"use client";

import { useUser } from "@stuff/lib/useUser";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
export const UserChecker = ({ whenDone }: { whenDone: () => void }) => {
  const user = useUser();
  const router = useRouter();

  const call = useCallback(() => whenDone(), [whenDone]);

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    if (user !== null) {
      router.replace("/mail/inbox");
      return;
    }
    call();
  }, [call, router, user]);
  return null;
};
