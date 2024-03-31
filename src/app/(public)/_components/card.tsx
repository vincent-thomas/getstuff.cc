import { cn } from "packages/components/utils";
import type { HTMLAttributes, ReactNode } from "react";
import { border } from "src/components/recipies";
import { theme } from "src/styles/themes.css";

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
  className?: string;
})  {

  return (
    <div
      className={cn(
        border({rounded: "radius"}),
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
