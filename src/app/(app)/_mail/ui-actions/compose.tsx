"use client";

import { api } from "@stuff/api-client/react";
import { H1 } from "@stuff/typography";
import { Button } from "@stuff/ui/button";
import { atom } from "jotai";
import { Form } from "packages/ui/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "packages/ui/components/dialog";
import { spacing } from "packages/ui/variables";
import { type FC, useRef, useState } from "react";
import { toast } from "sonner";
import { border } from "src/components/recipies";
import { z } from "zod";
import { Spinner } from "../../auth/icons/spinner";
import Tiptap from "../_[folder]/_components/tiptap";

export const composeActionOpen = atom(false);

interface UIAction {
  open: boolean;
  onChange: (state: boolean) => void;
}

export const ComposeAction: FC<UIAction> = ({ open, onChange }) => {
  const form = Form.useStore({
    defaultValues: {
      to: "",
      subject: "",
    },
  });

  const ref = useRef<HTMLDivElement>(null);

  const [shouldShadow, setShouldShadow] = useState(false);
  const [emailBody, setEmailBody] = useState({ html: "", text: "" });

  // const sendEmailMutation = api.mail.sendMail.sendMail.useMutation();

  const [loading, setLoading] = useState(false);

  const onSubmit = async ({
    to,
    subject,
    content,
  }: {
    to: string;
    subject: string;
    content: { text: string; html: string };
  }) => {
    setLoading(true);

    const promise = async () => {
      // await sendEmailMutation.mutateAsync({
      //   subject,
      //   to: [to],
      //   content,
      //   bcc: [],
      //   cc: [],
      // });
      setLoading(false);
      onChange(false);
    };

    toast.promise(promise, {
      loading: "Sending email...",
      success() {
        return "Email sent";
      },
      error() {
        return "Unknown error";
      },
      position: "bottom-center",
    });
  };

  form.useValidate(({ values }) => {
    if (!z.string().email().safeParse(values.to).success) {
      form.setError("to", "Invalid email");
      return;
    }

    if (!values.subject) {
      form.setError("subject", "Subject is required");
      return;
    }
  });

  form.useSubmit(
    async ({ values }) =>
      await onSubmit({
        to: values.to,
        subject: values.subject,
        content: emailBody,
      }),
  );
  const subject = form.useValue(form.names.subject);

  return (
    <Dialog
      onOpenChange={state => {
        if (!loading) {
          onChange(state);
        }
      }}
      open={open}
    >
      <DialogContent size="lg">
        <div className={css({ p: "large" })}>
          <H1 className={cn(css({ fontSize: "xlarge" }))}>
            {subject || "Compose"}
          </H1>
          <DialogDescription>Send an email</DialogDescription>
        </div>
        <div className={cn(border({ side: "t", color: "interactive" }))} />
        <Form.Root store={form}>
          <div
            className={cn(
              css({ color: "text1", width: "full" }),
              stack({ direction: "col" }),
            )}
            style={
              shouldShadow
                ? { boxShadow: "0 0 20px rgba(0,0,0,0.2)" }
                : undefined
            }
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                alignItems: "center",
                gap: spacing.small,
              }}
              className={cn(css({ pX: "large" }))}
            >
              <Form.Label
                name={form.names.to}
                className={cn(
                  css({ bg: "bgSelected", p: "small" }),
                  border({ rounded: "radius" }),
                )}
              >
                To:
              </Form.Label>
              <Form.Input
                name={form.names.to}
                className={cn(
                  css({
                    fontSize: "medium",
                    marginLeft: "small",
                    pY: "large",
                    color: "text2",
                  }),
                )}
              />
              <Form.Error name={form.names.to} />
            </div>
            <div className={cn(border({ side: "t", color: "interactive" }))} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: spacing.small,
                alignItems: "center",
              }}
              className={cn(css({ pX: "large" }))}
            >
              <Form.Label
                name={form.names.subject}
                className={cn(
                  css({ bg: "bgSelected", p: "small" }),
                  border({ rounded: "radius" }),
                )}
              >
                Subject:
              </Form.Label>
              <Form.Input
                name={form.names.subject}
                className={cn(
                  css({
                    fontSize: "medium",
                    marginLeft: "small",
                    pY: "large",
                    color: "text2",
                    fontWeight: "semibold",
                  }),
                )}
              />
              <Form.Error name={form.names.subject} />
            </div>
            <div className={cn(border({ side: "t", color: "interactive" }))} />
          </div>

          <div
            ref={ref}
            className={cn(css({ width: "full", p: "large", color: "text2" }))}
            style={{ minHeight: "300px", overflow: "auto", maxHeight: "50vh" }}
          >
            <Tiptap
              onUpdate={editor => {
                setShouldShadow(
                  (ref.current?.clientHeight || 0) > window.innerHeight * 0.5,
                );
                setEmailBody({ html: editor.html, text: editor.text });
              }}
              initialContent="<p></p>"
              innerClassName={cn(css({ paddingBottom: "3xlarge" }))}
              placeholder="Email content here..."
            />
          </div>
          <div
            className={cn(
              border({ side: "t", color: "interactive" }),
              stack({ gap: "md", justify: "end", align: "center" }),
              css({ p: "large" }),
            )}
          >
            <Button
              variant="outline"
              rounded="medium"
              size="md"
              onClick={() => onChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              rounded="medium"
              size="md"
              type="submit"
              disabled={loading}
            >
              Send
              {loading && <Spinner size={20} />}
            </Button>
          </div>
        </Form.Root>
      </DialogContent>
    </Dialog>
  );
};
