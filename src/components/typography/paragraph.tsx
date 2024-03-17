import type { ReactNode } from "react";

export const P = ({ children }: { children: ReactNode }) => {
  return <p className="text-accent-foreground">{children}</p>;
};