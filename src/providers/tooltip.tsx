import { TooltipProvider } from "@stuff/ui/tooltip";
import type { ReactNode } from "react";

export const ToolTipProvider = ({ children }: { children: ReactNode }) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};
