import type { ReactNode } from "react";
import { cn } from "../utils";

export const H1 = ({ children, className, id }: { children: ReactNode,className?:string, id?:string }) => {
  return <h1 id={id} className={cn("mb-2 text-4xl font-bold tracking-tight text-foreground", className)}>{children}</h1>;
};

export const H2 = ({ children,className }: { children: ReactNode,className?:string }) => {
  return <h2 className={cn("mb-2 text-3xl font-bold tracking-tight text-foreground", className)}>{children}</h2>;
};

export const H3 = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-2 text-xl font-bold">{children}</h2>;
};

export const H4 = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-2 text-lg font-bold">{children}</h2>;
};