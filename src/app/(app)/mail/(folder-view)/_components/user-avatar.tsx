"use client";

import { useUser } from "@stuff/lib/useUser";


export const UserAvatar = () => {
  const user = useUser();

  if (user?.avatar_url === undefined) {
    return null;
  }

  return (
    <img src={user?.avatar_url} className="h-[38px] w-[38px] rounded-full" alt="User selected avatar" />
  );
};
