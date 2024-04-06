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
import { menuItem, menuItemStyle } from "./menu.css";
import { stack } from "packages/ui/patterns/stack";

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
				menuItemStyle,
				css({
					bg: { hover: variant === "danger" ? undefined : "bgHover" },
					p: "large",
					fontSize: "medium",
					fontWeight: "semibold",
				}),
				stack({ align: "center", gap: "md" }),
				className,
			)}
			{...props}
		/>
	);
};

export const MenuDescription: FC<{ children: ReactNode; className?: string }> =
	({ children, className }) => {
		return (
			<P
				className={cn(
					css({
						fontSize: "small",
						paddingTop: "xsmall",
					}),
					className,
				)}
			>
				{children}
			</P>
		);
	};

export interface MenuContentProps extends AriaMenuContentProps {}

export const MenuContent: FC<MenuContentProps> = ({
	className,
	style,
	...props
}) => {
	return (
		<AriaMenuContent
			style={{ ...style, marginTop: spacing.small }}
			className={cn(
				css({
					bg: "bgComponent",
					p: "small",
				}),
				stack({ direction: "col", gap: "xs" }),
				border({ color: "interactive", rounded: "radius", side: "all" }),
				className,
			)}
			{...props}
		/>
	);
};

export interface MenuSeperatorProps extends AriaMenuSeperatorOptions {}

export const MenuSeparator: FC<MenuSeperatorProps> = () => {
	return (
		<AriaMenuSeparator
			style={{
				borderBottom: "none",
				borderTop: `1px solid ${palette.borderComponent}`,
				borderLeft: `1px solid ${palette.borderComponent}`,
				borderRight: `1px solid ${palette.borderComponent}`,
				marginInline: `calc(${spacing.small}*-1)`,
			}}
		/>
	);
};
