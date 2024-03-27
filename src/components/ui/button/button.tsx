"use client";

import { type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@stuff/components/utils"
import { buttonVariants } from "./variants";
import { Loading } from "@stuff/icons/loading";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
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
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}

        {loading && (
          <Loading
            color={
              variant === "primary"
                ? "hsl(var(--muted-foreground))"
                : "hsl(var(--foreground))"
            }
            size={20}
          />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
