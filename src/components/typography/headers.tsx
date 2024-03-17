import type { ReactNode } from "react";

export const H1 = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-2 text-3xl font-bold">{children}</h2>;
};

export const H2 = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-2 text-2xl font-bold">{children}</h2>;
};

export const H3 = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-2 text-xl font-bold">{children}</h2>;
};

export const H4 = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-2 text-lg font-bold">{children}</h2>;
};