import { border } from "src/components/recipies";
import { setupLayout } from "src/utils/setupPage";
import { z } from "zod";
import { Sidebar } from "../views/sidebar";
import { StuffBranding } from "src/app/(public)/_components/stuff";
import { Logo } from "src/components/logo";
import { AccountViewer } from "../_components/account-viewer";
import { Searchbar } from "./search-bar";
import { Suspense } from "react";
import { FolderHeader } from "./views/header";
import { MailTable } from "./views/mail-table";
import { Provider } from "./views/context";
import dynamic from "next/dynamic"

const CommandMenu = dynamic(() => import("../ui-actions/commandMenu").then(v => ({default: v.CommandMenu})), {ssr: false});
const UIActions = dynamic(() => import("../ui-actions").then(v => ({default: v.UIActions})), {ssr: false});
const MailRelayModal = dynamic(() => import("../ui-actions/mailRelay").then(v => ({default: v.MailRelayModal})), {ssr: false});

export default setupLayout({
	query: z
		.object({
			q: z.string().optional(),
		})
		.optional(),
	params: z.object({ folder: z.string() }),
	Component({ params, query, children }) {

		return (
			<Provider>
				<UIActions />
				<CommandMenu />
				<MailRelayModal />
				<div
					className={cn(
						stack({ direction: "col" }),
						css({ height: "screen", bg: "bgSubtle" }),
					)}
				>
					<div
						className={cn(
							stack({ gap: "sm" }),
							css({
								padding: "small",
								fontSize: "xlarge",
								fontWeight: "bold",
							}),
						)}
					>
						<div
							style={{ maxWidth: "240px", width: "100%" }}
							className={cn(
								stack({ gap: "md", align: "center" }),
								css({ paddingLeft: "medium" }),
							)}
						>
							<Logo size={32} />
							<StuffBranding />
						</div>
						<Searchbar />
						<div
							className={cn(
								css({ marginLeft: "auto" }),
								stack({ align: "center" }),
							)}
						>
							<AccountViewer />
						</div>
					</div>
					<div
						className={cn(
							css({
								bg: "bgSubtle",
								p: "small",
								paddingTop: "none",

								height: "full",
								overflow: "hidden",
							}),
							stack({
								direction: { mobile: "reverse-col", tablet: "row" },
								gap: "sm",
							}),
						)}
					>
						<Sidebar />
						<main
							className={cn(
								stack({}),
								css({
									width: "full",
									height: "full",
									bg: "bgApp",
									overflowY: "hidden",
								}),
								border({ rounded: "xl" }),
							)}
						>
							<div
								className={cn(
									stack({ direction: "col" }),
									css({ height: "full", width: "full" }),
								)}
							>
								<Suspense>
									<FolderHeader folderId={params.folder} />
								</Suspense>
									<MailTable folderId={params.folder} searchQuery={query?.q} />
							</div>
							{children}
						</main>
					</div>
				</div>
			</Provider>
		);
	},
});