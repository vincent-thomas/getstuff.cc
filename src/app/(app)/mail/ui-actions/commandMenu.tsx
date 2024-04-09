"use client";

import { Dialog, DialogDismiss } from "@ariakit/react";
import {
	Fragment,
	useDeferredValue,
	useEffect,
	useMemo,
	useState,
	type FC,
	type ReactNode,
} from "react";
import { DialogRoot, cardRoot, cardStyle, comboboxItem } from "./commandMenu.css";
import { button } from "@stuff/ui/button";
import { PlusIcon } from "lucide-react";
import { matchSorter } from "match-sorter";
import groupBy from "lodash.groupby";
import * as Ariakit from "@ariakit/react";
import { spacing } from "packages/ui/variables";
import { actions } from "./things";
import { border } from "src/components/recipies";

export interface IAction {
	trigger: ReactNode;
	className?: string;
}

export interface ComboboxProps extends Omit<Ariakit.ComboboxProps, "onChange"> {
	value?: string;
	onChange?: (value: string) => void;
}

export const CommandMenu: FC = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const deferedValue = useDeferredValue(value);

	useEffect(() => {
		const ctrl1 = (e: KeyboardEvent) => e.ctrlKey && e.key === "p";

		const handler = (e: KeyboardEvent) => {
			if (ctrl1(e)) {
				setOpen((is) => !is);
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

	const list = useMemo(() => {
		const searched = matchSorter(actions, deferedValue, {
			keys: ["label", "type"],
		});
		return Object.entries(groupBy(searched, "type"));
	}, [deferedValue]);

	const store = Ariakit.useComboboxStore();

	return (
		<Dialog
			open={open}
			className={cn(DialogRoot)}
			onClose={() => {
				setValue("");
				setOpen(false);
			}}
		>
			<Ariakit.ComboboxProvider store={store}>
				<div className={cn(cardRoot, border({ rounded: "radius" }),  stack({ direction: "col", gap: "sm" }))}>
					<div
						className={cn(cardStyle, css({ pY: "large" }))}
						style={{
							display: "grid",
							gap: spacing.medium,
							gridTemplateColumns: "1fr auto auto",
						}}
					>
						<Ariakit.Combobox
							placeholder="Search for anything..."
							className={cn(
								css({ fontSize: "medium", color: "text2", p: "small" }),
							)}
							value={value}
							autoSelect
							onChange={(e) => setValue(e.currentTarget.value)}
						/>
						<div>
							{value !== "" && (
								<Ariakit.ComboboxCancel
									className={cn(
										button({ variant: "ghost", size: "sm", rounded: "icon" }),
									)}
								>
									<PlusIcon
										size={24}
										style={{ rotate: "45deg" }}
										onClick={() => setValue("")}
									/>
								</Ariakit.ComboboxCancel>
							)}
						</div>
						<div>
							<DialogDismiss
								className={cn(
									button({ variant: "outline", size: "sm", rounded: "medium" }),
									css({bg: "bgComponent"})
								)}
							>
								Esc
							</DialogDismiss>
						</div>
					</div>
					<Ariakit.ComboboxList alwaysVisible className={cn(cardStyle, css({overflowY: "auto"}))} style={{maxHeight: "370px"}}>
						<div>
							{list.length === 0 ? (
								<div className={cn(css({ p: "small", color: "text1" }))}>
									No actions available
								</div>
							) : (
								list.map(([type, items], i) => (
									<Fragment key={i}>
										<Ariakit.ComboboxGroup
											className={cn(
												stack({ direction: "col" }),
												css({ pY: "small" }),
											)}
										>
											<h1
												role="button"
												onClick={() => {
													setValue(type);
												}}
												className={cn(
													css({
														color: "text1",
														fontSize: "small",
														p: "xsmall",
														cursor: "pointer",
													}),
												)}
											>
												{type}
											</h1>
											{items.map((item, i) => (
												<Ariakit.ComboboxItem
													focusOnHover
													setValueOnClick={false}
													key={i}
													value={item.label}
													onClick={async () => {
														await item.action();
														setValue("");
														setOpen(false);
													}}
													className={cn(
														button({
															variant: "ghost",
															size: "md",
															rounded: "medium",
														}),
														stack({ justify: "start", gap: "md" }),
														comboboxItem,
													)}
												>
													<item.Icon size={24} />
													{item.label}
												</Ariakit.ComboboxItem>
											))}
										</Ariakit.ComboboxGroup>
									</Fragment>
								))
							)}
						</div>
					</Ariakit.ComboboxList>
				</div>
			</Ariakit.ComboboxProvider>
		</Dialog>
	);
};