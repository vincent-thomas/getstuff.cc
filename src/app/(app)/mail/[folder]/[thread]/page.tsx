import { z } from "zod";
import { setupPage } from "@stuff/client/utils";
import { border } from "src/components/recipies";
import { button } from "@stuff/ui/button";
import { Link } from "src/components/structure/link";
import { PlusIcon } from "lucide-react";
import { SelectedBar } from "../_components/selected-bar";

import { Suspense } from "react";
import { ThreadContent, ThreadContentSkeleton } from "./components";
import { pulse } from "packages/ui/keyframes";

const ConversationButtonBar = ({
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

export default setupPage({
	params: z.object({
		folder: z.string(),
		thread: z.string(),
	}),
	async Component({ params: { folder: folderId, thread: threadId } }) {
		const conversationProps = {
			folderId,
			threadId,
		};

		return (
			<div
				style={{ minWidth: "600px" }}
				className={cn(
					border({ color: "subtle", side: "l" }),
					stack({ direction: "col" }),
				)}
			>
				<ConversationButtonBar {...conversationProps} />
				<Suspense
					fallback={
						<div
							className={cn(
								css({ p: "medium" }),
								stack({ direction: "col", gap: "md" }),
							)}
						>
							<div
								className={cn(
									css({ width: "full", bg: "bgComponent" }),
									border({ rounded: "radius" }),
								)}
								style={{
									height: "46px",
									animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
								}}
							/>
							{[0, 1, 2].map((index) => (
								<ThreadContentSkeleton key={index} />
							))}
						</div>
					}
				>
					<ThreadContent {...conversationProps} />
				</Suspense>
			</div>
		);
	},
});
