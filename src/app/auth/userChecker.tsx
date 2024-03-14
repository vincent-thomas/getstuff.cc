"use client";

import { useUser } from "@/lib/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const UserChecker = ({ whenDone }: { whenDone: () => void }) => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    if (user !== null) {
      router.push("/mail/inbox");
      return;
    }
    whenDone();
  }, [user]);
  return null;
};
