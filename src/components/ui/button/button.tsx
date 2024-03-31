"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { buttonVariants } from "./variants";
import { Loading } from "@stuff/icons/loading";
import { cx } from "@stuff/styling/css";
import type { RecipeVariantProps } from "@stuff/styling/types";

type ButtonVariants = Exclude<RecipeVariantProps<typeof buttonVariants>, undefined>;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
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
        className={cx(buttonVariants({ variant, size }), className)}
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
