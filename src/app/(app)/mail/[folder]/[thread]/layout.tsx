import { setupLayout } from "src/utils/setupPage";
import { z } from "zod";
import { ConversationButtonBar } from "./components/components";
import { border } from "src/components/recipies";

const Layout = setupLayout({
	params: z.object({
		folder: z.string(),
		thread: z.string(),
	}),
	Component({ params, children }) {
		return (
			<div
				style={{ minWidth: "600px" }}
				className={cn(
					border({ color: "subtle", side: "l" }),
					stack({ direction: "col" }),
				)}
			>
        <ConversationButtonBar folderId={params.folder} threadId={params.thread} />
        {children}
      </div>
		);
	},
});

export default Layout;
