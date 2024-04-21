"use client";

import { setupPage } from "src/utils/setupPage";
import { api } from "@stuff/api-client/react";
import { Alias } from "../components/alias";

export default setupPage({
  Component() {
    const { data: aliases } = api.mailRelay.listAliases.useQuery();

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
