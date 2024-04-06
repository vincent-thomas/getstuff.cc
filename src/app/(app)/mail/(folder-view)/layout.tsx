import type { LayoutProps } from "src/types/router";
import { Sidebar } from "./views/sidebar";
import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
import { stack } from "src/components/recipies";
import { cn } from "@stuff/components/utils";
import { Searchbar } from "./search-bar";
import { StuffBranding } from "src/app/(public)/_components/stuff";
import { Logo } from "src/components/logo";
import { AccountViewer } from "./_components/account-viewer";

const Layout = async (props: LayoutProps) => {
	const session = await api.user.session.query();

	if (session === null) {
		redirect("/auth/identify");
	}

	return (
		<div
			className={cn(
				stack({ direction: "col" }),
				css({ height: "full", bg: "bgSubtle" }),
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
				<div className={cn(css({ marginLeft: "auto" }))}>
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
					}),
					stack({
						direction: { mobile: "reverse-col", tablet: "row" },
					}),
				)}
			>
				<div
					style={{ minWidth: "240px" }}
					className={css({ marginRight: "small" })}
				>
					<Sidebar />
				</div>

				{props.children}

				{/* <div
				className={cn(
					css({ p: "large" }),
					stack({ gap: "lg", direction: "col" }),
				)}
				style={{ flexGrow: "1", overflowBlock: "hidden" }}
			>
				<Searchbar /> */}
				{/* </div> */}
			</div>
		</div>
	);
};

export default Layout;
