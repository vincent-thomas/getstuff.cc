import { border } from "src/components/recipies";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "packages/ui/components/tooltip/tooltip";
import { Button, button } from "@stuff/ui/button";
import { PlusIcon, ShieldCheckIcon } from "lucide-react";
import { pulse } from "packages/ui/keyframes";
import { Link } from "src/components/structure/link";
import { SelectedBar } from "../../_components/selected-bar";

export const ConversationButtonBar = ({
	folderId,
	threadId,
}: { folderId: string; threadId: string }) => {
	return (
		<div
			className={cn(stack({ align: "center", gap: "sm" }), css({ p: "small" }))}
		>
			<Link
				className={cn(button({ variant: "icon", size: "sm" }))}
				href={`/mail/${folderId}`}
			>
				<PlusIcon size={18} style={{ rotate: "45deg" }} color={palette.text1} />
			</Link>
			<SelectedBar threadIds={[threadId]} folderId={folderId} />
		</div>
	);
};

export const ThreadContentSkeleton = () => {
	return (
		<div
			className={cn(
				css({ width: "full", bg: "bgComponent" }),
				border({ rounded: "radius" }),
			)}
			style={{
				height: "270px",
				animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
			}}
		/>
	);
};

export const ThreadHeading = ({ title }: { title: string }) => {
	return (
		<div
			className={cn(
				css({ p: "medium" }),
				stack({ gap: "lg", align: "center", justify: "between" }),
			)}
		>
			<h1 className={cn(css({ fontSize: "large", color: "text2" }))}>
				{title}
			</h1>
			<Tooltip>
				<TooltipTrigger render={<Button variant="icon" size="sm" />}>
					<ShieldCheckIcon size={18} color={palette.text1} />
				</TooltipTrigger>
				<TooltipContent>
					<p className={cn(css({ color: "text1", fontSize: "small" }))}>
						This thread is encrypted by Stuff, only you can read this
					</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
};
