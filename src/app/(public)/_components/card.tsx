import { cn } from "packages/components/utils";
import { spacing } from "packages/ui/variables";
import type { HTMLAttributes, ReactNode } from "react";
import { border } from "src/components/recipies";
import { theme } from "src/styles/themes.css";

interface CardProps extends HTMLAttributes<HTMLDivElement>{
  p?: "sm" | "md" | "lg" | "xl" | undefined;
  children?: ReactNode;
}

function getPadding(p: CardProps["p"]) {
  switch (p) {
    case "sm":
      return spacing.small;
    case "md":
      return spacing.medium;
    case "lg":
      return spacing.large;
      case "xl":
        return spacing.xlarge;
    case undefined:
      return "none";
  }
}

export function Card({
  className,
  p,
  ...props
}: CardProps & {
  className?: string;
})  {

  return (
    <div
      className={cn(
        border({rounded: "lg"}),
        className,
      )}
      style={{
        padding: getPadding(p),
        background: theme.card
      }}
      {...props}
    />
  );
};
