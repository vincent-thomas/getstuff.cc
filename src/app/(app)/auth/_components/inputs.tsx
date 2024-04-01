import { cn } from "@stuff/components/utils";
import { type InputHTMLAttributes, type Ref, forwardRef } from "react";
import { border, stack } from "src/components/recipies";
import { css } from "src/components/styler.css";

export const MailInput = forwardRef(function MailInput(
  {locked, ...props}: InputHTMLAttributes<HTMLInputElement> & { locked?: boolean},
  ref: Ref<HTMLInputElement>
) {
  return (
    <div
      className={cn(
        border({rounded: "radius"}),
        stack({justify: "between", gap: "sm"}),
        css({background: "transparent"})
      )}
    >
      <input
        disabled={locked}
        ref={ref}
        placeholder="Enter email..."
        className={cn(css({p: "medium", paddingRight: "none", bg: locked ? "text2" : undefined }))}
        {...props}
      />
      <p style={{overflow: "hidden", borderBlock: "none", borderRight: "none"}} className={cn(
          css({ background: "bg2", color: "text2", p: "medium" }),
          border({}),
        )}
      >
        @getstuff.cc
      </p>
    </div>
  );
});

export const PasswordInput = forwardRef(function PasswordInput(
  {
    repeat,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { repeat?: true },
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      placeholder={repeat ? "Repeat password..." : "Enter password..."}
      className={cn(border({rounded: "radius", thickness: "normal"}), css({bg: "transparent", p: "medium"}),"focus:bg-muted")}
      type="password"
      {...props}
    />
  );
});

export const NameInput = forwardRef(function NameInput(
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      placeholder="Enter name..."
      className="rounded-md border border-border bg-transparent p-3 outline-none focus:bg-muted"
      {...props}
    />
  );
});
