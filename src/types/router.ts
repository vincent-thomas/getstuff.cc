import type { ReactNode } from "react";

export interface LayoutProps {
	children: ReactNode;
}

export type PageProps = {
	params: Record<string, string | string[]>;
	searchParams: Record<string, string | string[]>;
};
