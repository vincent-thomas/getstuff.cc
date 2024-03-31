"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { type ButtonVariants, button } from "./button.css";
import { Loading } from "@stuff/icons/loading";
import { cn } from "@stuff/components/utils";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants & {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, disabled, loading, children, ...props },
    ref
  ) => {
    return (
      <button
        disabled={disabled ?? loading}
        ref={ref}
        className={cn(button({ variant, size }), className)}
        {...props}
      >
        {children}

        {loading && (
          <Loading
            color={
              variant === "primary"
                ? "var(--text2)"
                : "var(--text)"
            }
            size={20}
          />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
