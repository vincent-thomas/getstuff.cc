import { TRPCReactProvider } from "@stuff/api-client/react";
import type { ReactNode } from "react";
import { JotaiProvider } from "@/providers/jotai";
import { ToolTipProvider } from "@/providers/tooltip";
import { ToastProvider } from "@/providers/sonner";

export const metadata = {
  title: "Stuff Mail",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <JotaiProvider>
      <ToastProvider>
        <ToolTipProvider>
          <TRPCReactProvider>
            <div vaul-drawer-wrapper="" className="h-screen">
              {children}
            </div>
          </TRPCReactProvider>
        </ToolTipProvider>
      </ToastProvider>
    </JotaiProvider>
  );
}
