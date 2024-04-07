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

const Layout = setupLayout({
	query: z
		.object({
			q: z.string().optional(),
		})
		.optional(),
	params: z.object({ folder: z.string() }),
	Component({ params, query, children }) {
		return (
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
							border({ rounded: "lg" }),
						)}
					>
						<div
							className={cn(
								stack({ direction: "col" }),
								css({ height: "full", width: "full" }),
							)}
						>
							<FolderHeader folderId={params.folder} />
							<Suspense>
								<MailTable folderId={params.folder} searchQuery={query?.q} />
							</Suspense>
						</div>
						{children}
					</main>
				</div>
			</div>
		);
	},
});

export default Layout;
