import type { FC, HTMLAttributes } from "react";
import { cn } from "../utils";


interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  weight: "bold" | "normal" | "semibold";
}

export const Heading: FC<HeadingProps> = ({className,weight, ...props}) => (
  <h1 {...props} style={{fontWeight: weight}} className={cn(`tracking-tight text-text`, className)} />
)