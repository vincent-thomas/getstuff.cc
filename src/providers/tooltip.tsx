import { TooltipProvider } from "packages/components/lib/tooltip";
import type { ReactNode } from "react";

export const ToolTipProvider = ({ children }: { children: ReactNode }) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};
