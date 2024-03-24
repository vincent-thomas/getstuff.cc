import type { ReactNode } from "react";
import { cn } from "../utils";

export const P = ({ children,className }: { children?: ReactNode, className?:string }) => {
  return <p className={cn("text-text2", className)}>{children}</p>;
};