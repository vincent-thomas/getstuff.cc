import type { ReactNode } from "react";
import { cn } from "../utils";

export const P = ({ children,className }: { children: ReactNode, className?:string }) => {
  return <p className={cn("text-muted-foreground", className)}>{children}</p>;
};