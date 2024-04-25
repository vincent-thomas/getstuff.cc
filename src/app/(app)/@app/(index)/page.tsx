import { setupPage } from "src/utils/setupPage";
import { Alias } from "../components/alias";
import { z } from "zod";
import { listAliases } from "./actions/list-aliases-action-handler";
import { db } from "@backend/db";
import { getUser } from "../layout";

export default setupPage({
  query: z.object({
    q: z.string().optional(),
  }),
  async Component({ query }) {
    const user = await getUser();
    const aliases = await listAliases({
      clients: {
        db,
      },
      query: query.q,
      userId: user.userId,
    });

    if (aliases.length === 0) {
      return (
        <>
          <h1 className={cn(css({ color: "text1", fontSize: "medium" }))}>
            You have no aliases :(
          </h1>
        </>
      );
    }

    return (
      <div className={cn(stack({ direction: "col" }), css({ width: "full" }))}>
        {aliases.map(alias => (
          <Alias {...alias} key={alias.mailAlias} />
        ))}
      </div>
    );
  },
});
