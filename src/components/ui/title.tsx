import type { FC, HTMLAttributes } from "react";
import { cn } from "../utils";
import { css } from "styled-system/css";


interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  weight: "bold" | "normal" | "semibold";
}

export const Heading: FC<HeadingProps> = ({className,weight, ...props}) => (
  <h1 {...props} style={{fontWeight: weight}} className={cn(`tracking-tight`, css({color: "text"}), className)} />
)