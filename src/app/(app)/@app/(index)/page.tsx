"use client";

import { setupPage } from "src/utils/setupPage";
import { Alias } from "../components/alias";
import { useAtomValue } from "jotai";
import { searchQuery } from "../components/search-field";
import { useQuery } from "@tanstack/react-query";
import { listAliases } from "./actions/list-aliases.action";

export default setupPage({
  Component() {
    const query = useAtomValue(searchQuery);
    const { data: aliases } = useQuery({
      queryKey: ["list-aliases", query],
      queryFn: () => listAliases(query).then(v => v.data),
    });

    if (aliases === undefined) {
      return <></>;
    }

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
