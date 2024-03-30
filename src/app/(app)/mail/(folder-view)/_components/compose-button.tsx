"use client";

import { ArrowUpIcon, PlusIcon } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
import { css } from "styled-system/css";
import { theme } from "src/styles/themes.css";
import { Button } from "@stuff/ui/button";
import { Box, Stack } from "styled-system/jsx";

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
        <PlusIcon color={theme.text} size={24} />
        <span className={cn(css({fontWeight: "semibold", fontSize: "large"}))}>Compose</span>
      </DrawerTrigger>

      <DrawerContent asChild className={css({maxW: "800px", maxH: "1000px", display: 'grid', gridTemplateRows: "auto 1fr auto"})}>
        <form onSubmit={onSubmit}>
          <Box>
            <Stack justify="space-between" direction="row" align="center" p="xl">
              <Stack>
                <DrawerTitle>Send Email</DrawerTitle>
                <DrawerDescription>
                  Sending an email cant be undone
                </DrawerDescription>
              </Stack>
              <Button className={cn(css({rounded: "full", bg: "text.1", padding: "0.25rem"}))} type="submit">
                <ArrowUpIcon color={theme.background} size={26} />
              </Button>
            </Stack>
            <Box className={css({borderTopColor: "border",borderTopWidth: '1px'})}>
              <Flex
                className="w-full border-b border-border px-6 py-3"
                gap="1rem"
                align="center"
              >
                <span className={css({color: "text.2"})}>To:</span>
                <input
                  {...register("to")}
                  className="h-full w-full bg-transparent outline-none"
                />
              </Flex>
              <input
                type="text"
                className={cn("w-full bg-transparent text-2xl outline-none", css({p: "xl"}))}
                placeholder="Subject"
                {...register("subject")}
              />
            </Box>
          </Box>
          <ScrollArea className={css({h: "100%", px: "xl"})}>
            <Tiptap
              placeholder="Compose your email..."
              initialContent="<p></p>"
              onUpdate={({ text, html }) => setDefaultContent({ text, html })}
            />
          </ScrollArea>
          <DrawerFooter>
            <DrawerClose
              className={cn(buttonVariants({ variant: "outline" }), "w-full", "!border-border py-3")}
              type="button"
            >
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
