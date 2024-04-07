"use client";

import type { ButtonHTMLAttributes, FC } from "react";
import { type ButtonVariants, button } from "./button.css";
import { cn } from "@stuff/components/utils";
import { Button as AriaButton, type ButtonOptions } from "@ariakit/react";

export type ButtonProps = ButtonOptions &
	ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonVariants;

export const Button: FC<ButtonProps> = ({
	className,
	variant,
	size,
	...props
}) => (
	<AriaButton className={cn(button({ variant, size }), className)} {...props} />
);

Button.displayName = "Button";
