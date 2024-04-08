"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { border, shadow } from "src/components/recipies";
import { dialogContentStyles } from "./dialog.css";
import { stack } from "packages/ui/patterns/stack";
import { Button } from "@stuff/ui/button";
import { H1 } from "@stuff/typography";
import { spacing } from "packages/ui/variables";
import { DialogDescriptionProps } from "@ariakit/react";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay: React.FC<DialogPrimitive.DialogOverlayProps> = ({
	className,
	...props
}) => (
	<DialogPrimitive.Overlay
		style={{ inset: 0, zIndex: 50, backgroundColor: "rgba(0, 0, 0, 0.8)" }}
		className={cn(
			css({ position: "fixed" }),
			// "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
	/>
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
	onClosePress?: () => void;
	size: "sm" | "md" | "lg";
	mainTitle?: JSX.Element | string;
}

const DialogContent: React.FC<DialogContentProps> = ({
	className,
	children,
	onClosePress,
	size = "sm",
	mainTitle,
	...props
}) => {
	return (
		<DialogPortal>
			<DialogOverlay onClick={onClosePress} />
			<DialogPrimitive.Content
				style={{
					zIndex: 50,
					transform: "translate(-50%, -50%)",
					left: "50%",
					top: "50%",
					maxWidth: size === "sm" ? "26rem" : size === "md" ? "34rem" : "50rem",
					width: "100%",
				}}
				className={cn(
					css({
						position: "fixed",
						width: "full",
						bg: "bgComponent",
						// p: "large",
					}),
					dialogContentStyles,
					shadow({ size: "large" }),
					stack({ direction: "col" }),
					border({ color: "interactive", rounded: "radius", side: "all" }),
					className,
				)}
				{...props}
			>
				<DialogPrimitive.Close
					onClick={onClosePress}
					style={{
						top: 0,
						right: 0,
						marginTop: spacing.large,
						marginRight: spacing.large,
					}}
					className={cn(
						css({
							marginLeft: "auto",
							position: "absolute",
						}),
					)}
					asChild
				>
					<Button variant="icon" size="sm">
						<PlusIcon
							className={css({ color: "text1" })}
							size={24}
							style={{ rotate: "45deg" }}
						/>
					</Button>
				</DialogPrimitive.Close>
				{mainTitle && (
					<H1 className={css({ fontSize: "xlarge" })}>{mainTitle}</H1>
				)}

				{children}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
};

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col space-y-1.5 text-center sm:text-left",
			className,
		)}
		{...props}
	/>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
			className,
		)}
		{...props}
	/>
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle: React.FC<DialogPrimitive.DialogTitleProps> = ({
	className,
	...props
}) => (
	<DialogPrimitive.Title
		className={cn(
			"text-lg font-semibold leading-none tracking-tight",
			className,
		)}
		{...props}
	/>
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription: React.FC<DialogDescriptionProps> = ({
	className,
	...props
}) => (
	<DialogPrimitive.Description
		className={cn(
			"text-sm text-muted-foreground",
			css({ color: "text1" }),
			className,
		)}
		{...props}
	/>
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
