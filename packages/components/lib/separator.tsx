"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../utils";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef
} from "react";

const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      orientation === "horizontal"
        ? "w-full border-t border-border"
        : "h-full border-l border-border",
      className
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
