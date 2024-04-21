import { setupPage } from "src/utils/setupPage";
import { getUser } from "./layout";
import { db } from "backend/db";
import { quickAliases } from "backend/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { Alias } from "./components/alias";
export default setupPage({
  async Component() {
    unstable_noStore();
    const user = await getUser();
    const aliases = await db.query.quickAliases.findMany({
      where: and(eq(quickAliases.userId, user.userId)),
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
          <Alias {...alias} />
        ))}
      </div>
    );
  },
});
