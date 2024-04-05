"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "../../../../packages/components/utils";
import "./drawer.css";
import { contentWrapper, drawerOverlay } from "./drawer.css";
import { border, stack } from "src/components/recipies";
import { palette } from "packages/ui/theme";
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
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Overlay
		ref={ref}
		className={cn(drawerOverlay, className)}
		{...props}
	/>
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DrawerPortal>
		{/* <div
			className={css({ position: "fixed", color: "accent1" })}
			style={{ zIndex: 0 }}
		> */}
		<DrawerOverlay />

		<DrawerPrimitive.Content>
			<div
				style={{ inset: 0, backgroundColor: "white", position: "fixed" }}
				className={css({ padding: "2xlarge" })}
			>
				{children}
			</div>
		</DrawerPrimitive.Content>
		{/* </div> */}
		{/* <DrawerPrimitive.Content
			style={{
				inset: 0,
				backgroundColor: "white !important",
			}}
			className={css({ position: "fixed", paddingTop: "2xlarge" })}
		>
			<div style={{ backgroundColor: "white", zIndex: 50 }}>test</div>
		</DrawerPrimitive.Content> */}

		{/* // 	<div
	// 		className={cn(
	// 			// contentWrapper,
	// 			stack({ align: "end", justify: "center" }),
	// 			css({
	// 				paddingTop: "medium",
	// 				pX: "medium",
	// 			}),
	// 		)}
	// 	> */}
		{/* div */}
		{/* <DrawerPrimitive.Content
			ref={ref}
			style={{
				insetInline: "0",
				bottom: "0",
				top: "0",
				backgroundColor: palette.background2,
				zIndex: 50,
			}}
			className={css({ position: "fixed" })} */}
		{/* // style={{
			// 	height: "100%",
			// 	width: "100%",
			// 	borderTopLeftRadius: "10px",
			// 	borderTopRightRadius: "10px",
			// 	borderWidth: "1px",
			// }}
			// className={cn(
			// 	css({ bg: "bgApp" }),
			// 	border({ color: "interactive", rounded: "radius", side: "all" }),
			// 	className,
			// )}
		// 	{...props}
		// >
		// 	{children}
		// </DrawerPrimitive.Content> */}
		{/* // 	</div> */}
	</DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn(css({ p: "xlarge" }), className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn(css({ p: "xlarge" }), className)} {...props} />
);

DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Title
		ref={ref}
		className={cn(
			css({ fontWeight: "semibold" }),
			"text-2xl leading-none tracking-tight",
			className,
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
		className={cn(css({ color: "text2" }), "text-sm", className)}
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
	DrawerDescription,
};
