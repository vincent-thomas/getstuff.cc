import { api } from "@stuff/api-client/server";
import { setupPage } from "src/utils/setupPage";

export default setupPage({
  async Component({ params, query }) {
    const aliases = await api.mailRelay.listAliases.query();

    await api.mailRelay.createAlias.mutate({
      label: "testin",
    });

    return (
      <div className={cn(stack({ direction: "col" }))}>
        <nav></nav>
        <div></div>
      </div>
    );
  },
});
