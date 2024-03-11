"use client";

import { type VariantProps } from "class-variance-authority";
import { cn } from "../utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loading } from "packages/icons/lib/loading";
import { buttonVariants } from "./variants";

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
            innerClassName={
              variant === "default"
                ? "text-muted-foreground"
                : "text-foreground"
            }
            className={cn("h-[20px]")}
          />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
