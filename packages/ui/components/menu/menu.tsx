import {
  MenuButton as AriaMenuButton,
  type MenuButtonProps as AriaMenuButtonProps,
  Menu as AriaMenuContent,
  type MenuProps as AriaMenuContentProps,
  MenuItem as AriaMenuItem,
  type MenuItemProps as AriaMenuItemProps,
  MenuProvider as AriaMenuProvider,
  MenuSeparator as AriaMenuSeparator,
  type MenuSeparatorOptions as AriaMenuSeperatorOptions,
} from "@ariakit/react";
import { P } from "@stuff/typography";
import { stack } from "packages/ui/patterns/stack";
import { spacing } from "packages/ui/variables";
import type { FC, ReactNode } from "react";
import { border } from "src/components/recipies";
import { menuItem, menuItemStyle } from "./menu.css";

export const Menu = ({ children }: { children: ReactNode }) => {
  return <AriaMenuProvider>{children}</AriaMenuProvider>;
};

export const MenuButton: FC<AriaMenuButtonProps> = ({
  className,
  ref,
  ...props
}) => {
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
  ref,
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
          p: "medium",
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

export const MenuContent: FC<AriaMenuContentProps> = ({
  className,
  style,
  ref,
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

export const MenuSeparator: FC<AriaMenuSeperatorOptions> = () => {
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
