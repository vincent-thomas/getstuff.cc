import { FC, HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  inline?: true;
}

export const Text2: FC<TextProps> = ({ children, className, ...other }) => (
  <span className={cn(css({ color: "text2" }), className)} {...other}>
    {children}
  </span>
);

export const Text1: FC<TextProps> = ({
  children,
  className,
  inline,
  ...other
}) => (
  <span
    className={cn(
      css({ color: "text1", display: inline ? "inline-block" : "block" }),
      className,
    )}
    {...other}
  >
    {children}
  </span>
);
