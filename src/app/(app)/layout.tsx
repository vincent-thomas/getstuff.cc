import type { ReactNode } from "react";
import { JotaiProvider } from "src/providers/jotai";
import { ToastProvider } from "src/providers/sonner";
export const metadata = {
  title: "Stuff Mail",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <JotaiProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </JotaiProvider>
  );
}
