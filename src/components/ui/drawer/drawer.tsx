"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "../../../../packages/components/utils";
import { css } from "styled-system/css";
import "./drawer.css"
import { box } from "styled-system/patterns";
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props } , ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(css({position: "fixed", inset: 0, zIndex: 50, bg: "black/80"}), className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children,...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <div className={css({
      position: "fixed",
      top: 0,
      bottom: 0,
      insetX: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "end",
      justifyContent:"center",
      pt: {
        base: "md",
        md: "lg",
        lg: "xl"
      },
      px: {
        base: "sm",
        md: "xl"
      }
    })}>
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(css({bg: "background.1", h: "100%", w: "100%", roundedTop: "10px", borderWidth: "1px", borderColor: "border" }),
          className
        )}
        {...props}
      >
        {children}
      </DrawerPrimitive.Content>
    </div>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(box({p: "xl"}), className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(box({ p: "xl" }), className)}
    {...props}
  />
);

DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      css({fontWeight: "semibold"}),
      "text-2xl leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn(css({color: "text.2"}),"text-sm", className)}
    {...props}
  />
));

DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
};
