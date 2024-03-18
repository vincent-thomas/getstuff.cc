import "../../styles/globals.css";

import { Poppins } from "next/font/google";

import type { ReactNode } from "react";
import { cn } from "packages/components/utils";
import { TRPCReactProvider } from "@stuff/api-client/react";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "src/providers/theme";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const APP_NAME = "Stuff Mail"
const APP_TITLE = APP_NAME;
const APP_DESCRIPTION = "An end-to-end encrypted email client. The most private email client."

export const metadata: Metadata = {
  title: APP_NAME,
  manifest: "/manifest.json",
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_TITLE
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  
  },
  
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export const viewport: Viewport = {
  themeColor: "hsl(20 14.3% 4.1%)",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
          <div
            className={cn(
              poppins,
              "min-h-screen bg-background font-sans antialiased"
            )}
          >
              {children}
          </div>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
