"use client";

import { Dialog, DialogDismiss } from "@ariakit/react";
import { cloneElement, useEffect, useMemo, useState, type FC, type ReactNode } from "react";
import { DialogRoot, focusClass } from "./commandMenu.css";
import { border } from "src/components/recipies";
import { Button, button } from "@stuff/ui/button";
import { InboxIcon, LogOutIcon, LucideIcon, PlusIcon, SearchIcon } from "lucide-react";
import { ComposeAction, IComposeAction } from "./compose";
import Fuse from "fuse.js";
import { P } from "@stuff/typography";
import { useLogoutAction } from "../_components/account-viewer.actions";

export interface IAction {
	trigger: ReactNode;
	className?:string;
}

type Thing = {
	label:string;
	Icon: LucideIcon;
	Action: FC<IAction>

}

const Things: Thing[] = [
	{
		label: "Compose email",
		Icon: InboxIcon,
		Action: ComposeAction
	},
	{
		label: "Log out",
		Icon: LogOutIcon,
		Action: ({trigger: Trigger}) => {
			const logoutAction = useLogoutAction();
			// console.log(Trigger)
			const El = cloneElement(Trigger, {
				onClick: async () => {
					await logoutAction()
					Trigger.props.onClick();
				}
			})
			return El
	}
	}
]

const containerClass = cn(
	css({p: "medium", bg: "bgComponent"}),
	border({ rounded: "radius", color: "focus", side: "all" }),
)

export const CommandMenu: FC<IComposeAction> = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
    const ctrl1 = (e: KeyboardEvent) => e.ctrlKey && e.key === "p";

    const handler = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        setOpen(is => !is)
      }
    };

    const ignore = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", handler);
    window.addEventListener("keydown", ignore);

    return () => {
      window.removeEventListener("keyup", handler);
      window.removeEventListener("keydown", ignore);
    };
  }, []);

	const [shouldFocus, setShouldFocus] = useState(false);

	const list = useMemo(() => {
		if (value === "") {
			return Things;
		}

		const fuse = new Fuse(Things, {
			keys: ["label"]
		});

		const items = fuse.search(value).map(v=>v.item);
		if (items.length < Things.length) {
			setShouldFocus(true);
		} else {
			setShouldFocus(false)
		}
		return items;
	}, [value]);

	return (
		<Dialog

			open={open}
			className={cn(DialogRoot)}

			onClose={() => {
				setValue('');
				setOpen(false)
			}}
		>
			<div
				className={cn(
					css({ mX: "auto" }),
					stack({ direction: "col", gap:"sm" }),
				)}
				style={{ opacity: 1 }}
			>
				<form className={cn(stack({gap: "md"}),containerClass)} onSubmit={(e) => {
					e.preventDefault();
					console.log("ATT Göra fixa så att man kör första")
				}}>
					<Button variant="icon" size="sm" tabIndex={-1}><SearchIcon /></Button>
					<input
						placeholder="What to do?"
						className={cn(css({fontSize: "medium", color: "text2"}))}
						style={{ flexGrow: 1 }}
						value={value}
						onChange={(e) => setValue(e.currentTarget.value)}
					/>
					<DialogDismiss className={cn(
						button({variant: "outline", size: 'sm', rounded: "medium"})
						)}>Esc</DialogDismiss>
				</form>
				<div className={cn(containerClass, stack({direction: "col", gap: 'sm'}))}>
					{list.length === 0 ? (<P>No actions...</P>) : list.map((thing, i) => {
						const thisClass = i === 0 && shouldFocus ? focusClass : undefined;
						return (
						<thing.Action key={i} trigger={
								<Button key={i} onClick={() => setOpen(false)} size="md" rounded="medium" variant="ghost" className={cn(css({width: 'full'}), stack({justify: "start"}),thisClass)}>
									<thing.Icon size={24} />
									{thing.label}
								</Button>
							}
						/>
					)})}
				</div>
			</div>
		</Dialog>
	);
};
