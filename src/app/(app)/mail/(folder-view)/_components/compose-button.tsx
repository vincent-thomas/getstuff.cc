"use client";

import { ArrowUpIcon, PlusIcon } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMainContent,
  DrawerTitle,
  DrawerTrigger
} from "packages/components/lib/drawer";
import { cn } from "packages/components/utils";
import { useState } from "react";
import Tiptap from "../[folder]/_components/tiptap";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@stuff/api-client/react";
import { ScrollArea } from "packages/components/lib/scroll-area";
import { Flex } from "@stuff/structure";
import { buttonVariants } from "@stuff/ui/button/variants";

const mailSendInterface = z.object({
  to: z.string().email(),
  subject: z.string()
});

const contentInterface = z.object({
  text: z.string(),
  html: z.string()
});

export const ComposeButton = () => {
  const [open, setOpen] = useState(false);
  const [defaultContent, setDefaultContent] = useState({ text: "", html: "" });

  const sendMailMutation = api.mail.sendMail.sendMail.useMutation();

  const { register, handleSubmit, setValue } = useForm<
    z.infer<typeof mailSendInterface>
  >({
    resolver: zodResolver(mailSendInterface)
  });

  const onSubmit = handleSubmit(data => {
    const total = { ...data, content: contentInterface.parse(defaultContent) };

    const promise = sendMailMutation.mutateAsync.bind(this, {
      bcc: [],
      cc: [],
      content: total.content,
      subject: total.subject,
      to: [total.to]
    });

    setOpen(false);

    toast.promise(promise, {
      loading: "Loading...",
      position: "bottom-center",
      success() {
        return "Email sent";
      },
      error() {
        setOpen(true);
        return `Unknown Error: Failed to send email`;
      }
    });
    setValue("to", "");
    setValue("subject", "");
  });

  return (
    <Drawer
      dismissible={false}
      shouldScaleBackground
      onOpenChange={isOpen => setOpen(isOpen)}
      open={open}
    >
      <DrawerTrigger
        className="flex items-center gap-2 rounded-lg px-3 py-3 outline-border outline outline-[2px] outline-offset-[-2px] shadow-sm bg-hover"
        onClick={() => setOpen(true)}
      >
        <PlusIcon color="var(--text)" size={24} />
        <span className="font-semibold text-lg">Compose</span>
      </DrawerTrigger>

      <DrawerContent className="mx-auto flex w-screen max-w-[800px] flex-col overflow-visible border border-gray-500 bg-background2">
        <form onSubmit={onSubmit} className="pb-auto flex grow flex-col">
          <DrawerHeader>
            <Flex gap="1rem" align="center" justify="between">
              <DrawerTitle>Send Email</DrawerTitle>
              <button className="rounded-full bg-primary p-1" type="submit">
                <ArrowUpIcon color="var(--background)" size={26} />
              </button>
            </Flex>
            <DrawerDescription>
              Sending an email cant be undone
            </DrawerDescription>
          </DrawerHeader>
          <div className="border-t border-border">
            <Flex
              className="w-full border-b border-border px-6 py-3"
              gap="1rem"
              align="center"
            >
              <span className="text-muted-foreground">To:</span>

              <input
                {...register("to")}
                className="h-full w-full bg-transparent outline-none"
              />
            </Flex>
          </div>
          <DrawerMainContent className="flex grow flex-col gap-4">
            <input
              type="text"
              className="w-full bg-transparent text-2xl outline-none"
              placeholder="Subject"
              {...register("subject")}
            />
            <ScrollArea className="h-[calc(100vh-(8px+16px)-92px-50px-32px-70px-3rem-24px)]">
              <Tiptap
                placeholder="Compose your email..."
                initialContent="<p></p>"
                className="h-full"
                onUpdate={({ text, html }) => setDefaultContent({ text, html })}
              />
            </ScrollArea>
          </DrawerMainContent>
        </form>
        <DrawerFooter>
          <DrawerClose
            className={cn(buttonVariants({ variant: "outline" }), "w-full", "!border-border py-3")}
          >
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
