"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@stuff/components/utils"
import { buttonVariants } from "./variants";
import { Loading } from "@stuff/icons/loading";
import { theme } from "src/styles/themes.css";
import type { RecipeVariantProps } from "styled-system/types";

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
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}

        {loading && (
          <Loading
            color={
              variant === "primary"
                ? theme.text2
                : theme.text
            }
            size={20}
          />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
