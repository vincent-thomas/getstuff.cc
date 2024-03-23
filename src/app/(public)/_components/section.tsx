import { cn } from "packages/components/utils";
import type { ReactNode } from "react";

export const Section = ({
  children,
  className,
  highSpace
}: {
  children: ReactNode;
  className?: string;
  highSpace?: true
}) => {
  return (
    <section
      className={cn("mx-auto w-full max-w-[1100px] p-2 md:p-4", className, highSpace && "md:p-8 lg:p-16")}
    >
      {children}
    </section>
  );
};
