import { cn } from "packages/components/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement>{
  p?: "sm" | "md" | "lg" | undefined;
  children?: ReactNode;
}

function getPadding(p: CardProps["p"]) {
  switch (p) {
    case "sm":
      return "0.5rem";
    case "md":
      return "1rem";
    case "lg":
      return "1.5rem";
    case undefined:
      return "none";
  }
}

export function Card({
  className,
  p,
  ...props
}: CardProps & {
  noPadding?: boolean;
  className?: string;
})  {

  return (
    <div
      className={cn(
        "rounded-md border border-border bg-[var(--card)]",
        className,
      )}
      style={{
        padding: getPadding(p)
      }}
      {...props}
    />
  );
};
