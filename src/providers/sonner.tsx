import { Toaster } from "sonner";
import type { ReactNode } from "react";

export const ToastProvider = ({ children }: { children: ReactNode }) => (
	<>
		<Toaster />

		{children}
	</>
);
