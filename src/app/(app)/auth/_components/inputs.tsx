import { cn } from "@stuff/components/utils";
import type { InputHTMLAttributes } from "react";
import { border, stack } from "src/components/recipies";

export const MailInput = function MailInput({
  locked,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { locked?: boolean }) {
  return (
    <div
      className={cn(
        border({ rounded: "radius" }),
        stack({ justify: "between", gap: "sm" }),
        css({ background: "transparent" }),
      )}
    >
      <input
        disabled={locked}
        placeholder="Enter email..."
        className={cn(
          css({
            p: "medium",
            paddingRight: "none",
            bg: locked ? "text2" : undefined,
          }),
        )}
        {...props}
      />
      <p
        style={{ overflow: "hidden", borderBlock: "none", borderRight: "none" }}
        className={cn(
          css({ background: "bgSubtle", color: "text2", p: "medium" }),
          border({}),
        )}
      >
        @getstuff.cc
      </p>
    </div>
  );
};

export const PasswordInput = function PasswordInput({
  repeat,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { repeat?: true }) {
  return (
    <input
      placeholder={repeat ? "Repeat password..." : "Enter password..."}
      className={cn(
        border({ rounded: "radius" }),
        css({ bg: "transparent", p: "medium" }),
        "focus:bg-muted",
      )}
      type="password"
      {...props}
    />
  );
};

export const NameInput = function NameInput(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      placeholder="Enter name..."
      className="rounded-md border border-border bg-transparent p-3 outline-none focus:bg-muted"
      {...props}
    />
  );
};
