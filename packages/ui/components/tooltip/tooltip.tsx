import {
	type TooltipProviderProps,
	TooltipProvider,
	TooltipAnchor,
	Tooltip as AriaTooltip,
	type TooltipProps as AriaTooltipProps,
} from "@ariakit/react";
import type { FC } from "react";
import { border } from "src/components/recipies";

interface TooltipProps extends TooltipProviderProps {}

export const Tooltip: FC<TooltipProps> = (props) => (
	<TooltipProvider {...props} />
);

export const TooltipTrigger = TooltipAnchor;

export interface TooltipContentProps extends AriaTooltipProps {}

export const TooltipContent: FC<TooltipContentProps> = ({
	className,
	...props
}) => {
	return (
		<AriaTooltip
			className={cn(
				css({
					bg: "bgComponent",
					p: "small",
					color: "text2",
				}),
				border({ color: "interactive", rounded: "radius", side: "all" }),
				className,
			)}
			{...props}
		/>
	);
};
