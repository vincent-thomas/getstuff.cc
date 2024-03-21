import { cn } from "packages/components/utils";
import type { ReactNode } from "react";

export const Section = ({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn("mx-auto w-full max-w-[800px] p-2 md:p-4", className)}
    >
      {children}
    </section>
  );
};
