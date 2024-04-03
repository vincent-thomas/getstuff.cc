"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { type ButtonVariants, button } from "./button.css";
import { cn } from "@stuff/components/utils";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, disabled, children, ...props }, ref) => {
		return (
			<button
				disabled={disabled}
				ref={ref}
				className={cn(button({ variant, size }), className)}
				{...props}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";
