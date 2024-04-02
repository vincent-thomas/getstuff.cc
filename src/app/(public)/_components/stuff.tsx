import { cn } from "@stuff/components/utils";
import { brandingGradient } from "./stuff.css";

export const StuffBranding = ({
	className,
	plus,
}: { className?: string; plus?: true }) => {
	return (
		<span className={cn(brandingGradient, className)}>Stuff{plus && "+"}</span>
	);
};
