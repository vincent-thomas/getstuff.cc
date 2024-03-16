import { cn } from "packages/components/utils";
import type { ReactNode } from "react";

export const Card = ({
  children,
  className,
  noPadding
}: {
  children: ReactNode;
  noPadding?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-md border border-border bg-muted",
        className,
        !noPadding && "p-4"
      )}
    >
      {children}
    </div>
  );
};
