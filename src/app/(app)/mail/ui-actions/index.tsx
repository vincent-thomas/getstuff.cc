"use client";

import { useAtom } from "jotai";
import { ComposeAction, composeActionOpen } from "./compose";

export const UIActions = () => {
	const [open, setOpen] = useAtom(composeActionOpen);
	return <ComposeAction open={open} onChange={setOpen} />;
};
