import "../../styles/globals.css";

import { Poppins } from "next/font/google";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/providers/theme";
import { cn } from "packages/components/utils";

const open_sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: "Stuff Mail",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={cn(
              open_sans,
              "min-h-screen bg-background font-sans antialiased"
            )}
          >
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
