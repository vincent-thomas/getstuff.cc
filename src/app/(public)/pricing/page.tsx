import { Section } from "../_components/section";
import { Card } from "../_components/card";
import { PageHeador } from "../_components/header";
import { setupPage } from "@stuff/client/utils";
import { StuffBranding } from "../_components/stuff";
import { Text1, Text2 } from "packages/ui/atoms";
import { stack } from "packages/ui/patterns/stack";
import { themeMode } from "packages/ui/theme";
import { marker } from "./page.css";
import { FC } from "react";

interface TierProps {
	title: string;
	desc: string;
	price: number;
	features: string[];
}

const Tier: FC<TierProps> = ({ title, desc, price, features }) => {
	return (
		<Card className={cn(stack({ direction: "col" }))} style={{ flex: "1" }}>
			<div
				className={css({ p: "large" })}
				style={{
					borderBottom: `1px solid ${themeMode.border}`,
					width: "100%",
				}}
			>
				<div className={cn(stack({ align: "center", justify: "between" }))}>
					<h2
						className={css({
							color: "text1",
							fontWeight: "bold",
							fontSize: "large",
						})}
					>
						{title}
					</h2>
					<Text2 className="text-lg font-semibold">
						{price === 0 ? "free" : `$${price}/month`}
					</Text2>
				</div>
				<Text2 className="text-lg">{desc}</Text2>
			</div>
			<div className={css({ bg: "bg2", p: "large" })} style={{ flexGrow: 1 }}>
				<Text2
					className={cn(css({ fontWeight: "semibold", fontSize: "medium" }))}
				>
					<em>Features included:</em>
				</Text2>
				<ul
					style={{
						listStyleType: "disc",
					}}
					className={cn(
						css({ p: "small", paddingLeft: "large" }),
						stack({ gap: "sm", direction: "col" }),
					)}
				>
					{features.map((feature, i) => (
						<li className={marker} key={i}>
							<Text1>{feature}</Text1>
						</li>
					))}
				</ul>
			</div>
		</Card>
	);
};

export default setupPage({
	Component() {
		return (
			<div className={cn(stack({ direction: "col", gap: "lg" }), "pt-16")}>
				<PageHeador
					title={
						<>
							<StuffBranding plus /> Pricing
						</>
					}
					comment="Simple pricing for simple services."
				/>
				<Section
					maxWidth="md"
					className={cn(
						stack({ direction: { mobile: "col", desktop: "row" }, gap: "lg" }),
						css({ width: "full" }),
					)}
				>
					<Tier
						title="Stuff free"
						desc="Average internet user"
						features={[
							"2GB storage",
							"Tracking prevention",
							"End-to-End encrypted data",
							"Community support",
						]}
						price={0}
					/>
					<Tier
						title="Stuff+"
						desc="Average internet user"
						features={["Everything in free", "20GB storage"]}
						price={2.99}
					/>
				</Section>
			</div>
		);
	},
});
