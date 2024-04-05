"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { type ButtonVariants, button } from "./button.css";
import { cn } from "@stuff/components/utils";
import { Button as AriaButton, type ButtonOptions } from "@ariakit/react";

export type ButtonProps = ButtonOptions &
	ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, disabled, children, ...props }, ref) => {
		return (
			<AriaButton
				disabled={disabled}
				ref={ref}
				className={cn(button({ variant, size }), className)}
				{...props}
			>
				{children}
			</AriaButton>
		);
	},
);

Button.displayName = "Button";
