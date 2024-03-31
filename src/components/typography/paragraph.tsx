import type { ReactNode } from "react";
import { cn } from "../utils";
import { css } from "../styler.css";

export const P = ({ children,className }: { children?: ReactNode, className?:string }) => {
  return <p className={cn(css({color: "text2"}), className)}>{children}</p>;
};