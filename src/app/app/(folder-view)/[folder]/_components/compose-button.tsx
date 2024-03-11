"use client";

import { useAtom } from "jotai";
import { shouldShowCompose } from "../store/compose-button";
import { PlusIcon } from "lucide-react";

export const ComposeButton = () => {
  const setCompose = useAtom(shouldShowCompose)[1];
  return (
    <button
      className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
      onClick={() => setCompose(value => !value)}
    >
      <PlusIcon color="hsl(var(--muted-foreground))" size={24} />
      <span>Compose</span>
    </button>
  );
};
