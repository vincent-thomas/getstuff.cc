import { setupPage } from "@stuff/client/utils";
import { CommandMenu } from "../ui-actions/commandMenu";

export default setupPage({
	Component() {
		return (
			<>
				<CommandMenu />
			</>
		);
	},
});
