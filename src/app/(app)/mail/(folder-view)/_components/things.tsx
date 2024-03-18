import type { ReactNode } from "react";

export const Thing = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1 p-1">{children}</div>;
};