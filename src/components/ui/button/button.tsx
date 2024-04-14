"use client";

import { Button as AriaButton, type ButtonOptions } from "@ariakit/react";
import { cn } from "@stuff/components/utils";
import type { ButtonHTMLAttributes, FC } from "react";
import { type ButtonVariants, button } from "./button.css";

export type ButtonProps = ButtonOptions &
  ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants;

export const Button: FC<ButtonProps> = ({
  className,
  variant,
  rounded,
  size,
  ...props
}) => (
  <AriaButton
    className={cn(button({ variant, size, rounded }), className)}
    {...props}
  />
);

Button.displayName = "Button";
