import { cn } from "@stuff/components/utils";
import { Flex } from "@stuff/structure";
import { type InputHTMLAttributes, type Ref, forwardRef } from "react";

export const MailInput = forwardRef(function MailInput(
  {locked, ...props}: InputHTMLAttributes<HTMLInputElement> & { locked?: boolean},
  ref: Ref<HTMLInputElement>
) {
  return (
    <Flex className="rounded-md border border-border" justify="between">
      <input
        disabled={locked}
        ref={ref}
        placeholder="Enter email..."
        className={cn("p-3 pr-0 outline-none", locked ? "bg-muted" : "focus:bg-background2 bg-transparent")}
        {...props}
      />
      <p className="border-l overflow-hidden border-border bg-background2 p-3 text-text2">
        @getstuff.cc
      </p>
    </Flex>
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
      className="rounded-md border border-border bg-transparent p-3 outline-none focus:bg-muted"
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
