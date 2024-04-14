import type { FC, HTMLAttributes } from "react";
import { H1 } from "../typography/headers";
import { cn } from "../utils";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  weight: "bold" | "normal" | "semibold";
}

export const Heading: FC<HeadingProps> = ({
  className,
  weight,
  style,
  ...props
}) => (
  <H1
    {...props}
    style={{ ...style, fontWeight: weight }}
    className={cn(className)}
  />
);
