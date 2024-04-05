import {
	MenuProvider as AriaMenuProvider,
	MenuButton as AriaMenuButton,
	type MenuButtonProps as AriaMenuButtonProps,
	MenuItem as AriaMenuItem,
	type MenuItemProps as AriaMenuItemProps,
	type MenuSeparatorOptions as AriaMenuSeperatorOptions,
	MenuSeparator as AriaMenuSeparator,
	Menu as AriaMenuContent,
	type MenuProps as AriaMenuContentProps,
} from "@ariakit/react";
import { P } from "@stuff/typography";
import { spacing } from "packages/ui/variables";
import type { FC, ReactNode } from "react";
import { border } from "src/components/recipies";
import { menuItem } from "./menu.css";
import { stack } from "packages/ui/patterns/stack";
import { palette } from "packages/ui/theme";

export const Menu = ({ children }: { children: ReactNode }) => {
	return <AriaMenuProvider>{children}</AriaMenuProvider>;
};

export interface MenuButtonProps extends AriaMenuButtonProps {}

export const MenuButton: FC<MenuButtonProps> = ({ className, ...props }) => {
	return (
		<AriaMenuButton
			style={{ outlineOffset: "-2px" }}
			className={cn(menuItem, border({ rounded: "radius" }), className)}
			{...props}
		/>
	);
};

export interface MenuItemProps extends AriaMenuItemProps {
	variant?: "default" | "danger";
}

export const MenuItem: FC<MenuItemProps> = ({
	className,
	variant = "default",
	...props
}) => {
	return (
		<AriaMenuItem
			style={{
				backgroundColor: variant === "danger" ? "#E5484D" : undefined,
			}}
			className={cn(
				menuItem,
				css({
					bg: { hover: variant === "danger" ? undefined : "accent1" },
					p: "medium",
					color: {
						hover: variant === "danger" ? undefined : "bgApp",
						default: "text2",
					},
					fontWeight: "semibold",
					cursor: "pointer",
				}),
				stack({ align: "center", gap: "sm" }),
				border({ rounded: "radius" }),
				className,
			)}
			{...props}
		/>
	);
};

export const MenuDescription: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<P
			className={cn(
				css({
					fontSize: "small",
					paddingLeft: "small",
				}),
			)}
		>
			{children}
		</P>
	);
};

export interface MenuContentProps extends AriaMenuContentProps {}

export const MenuContent: FC<MenuContentProps> = ({ className, ...props }) => {
	return (
		<AriaMenuContent
			className={cn(
				css({
					bg: "bgComponent",
					p: "small",
				}),
				stack({ direction: "col", gap: "sm" }),
				border({ color: "interactive", rounded: "radius", side: "all" }),
				className,
			)}
			{...props}
		/>
	);
};

export interface MenuSeperatorProps extends AriaMenuSeperatorOptions {}

export const MenuSeperator: FC<MenuSeperatorProps> = () => {
	return (
		<AriaMenuSeparator
			style={{
				marginInline: `calc(${spacing.small}*-1)`,
				height: "1px !important",
				backgroundColor: palette.borderSubtle,
				border: "none",
			}}
		/>
	);
};
