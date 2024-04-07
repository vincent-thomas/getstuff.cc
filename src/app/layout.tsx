import "src/styles/themes.css";
import "../styles/globals.css";
import "./globals.css";

import { Inter } from "next/font/google";

import type { ReactNode } from "react";
import { cn } from "packages/components/utils";
import { TRPCReactProvider } from "@stuff/api-client/react";
import type { Metadata, Viewport } from "next";
import { roundingClass, spacingDefiningClass } from "packages/ui/variables";
import { themeClass } from "packages/ui/theme/palettes.css";
import { ToastProvider } from "src/providers/sonner";
const font = Inter({
	axes: ["slnt"],
	subsets: ["latin"],
});

const APP_NAME = "Stuff Mail";
const APP_TITLE = APP_NAME;
const APP_DESCRIPTION =
	"An end-to-end encrypted email client. The most private email client.";

export const metadata: Metadata = {
	title: APP_NAME,
	manifest: "/manifest.json",
	description: APP_DESCRIPTION,
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: APP_TITLE,
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
	twitter: {
		card: "summary",
		creator: "Vincent Thomas",
		site: env.APP_URL,
		title: APP_TITLE,
		description: APP_DESCRIPTION,
	},
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
	themeColor: "hsl(20 14.3% 4.1%)",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					font.className,
					css({ bg: "bgApp", minHeight: "screen" }),
					spacingDefiningClass,
					themeClass,
					roundingClass,
				)}
			>
				<ToastProvider>
					<TRPCReactProvider>{children}</TRPCReactProvider>
				</ToastProvider>
			</body>
		</html>
	);
}
