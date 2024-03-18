import { env } from "@/env";
import type { FC, JSX } from "react";
import type { PageProps } from "src/types/router";
import type { z, ZodSchema } from "zod";

type Page<T, C> = ({
  params,
  query
}: {
  params: T;
  query: C;
  env: typeof env;
}) => Promise<JSX.Element> | JSX.Element;

export const setupPage =
  <Params extends ZodSchema, Query extends ZodSchema>({
    params,
    query,
    Component
  }: {
    params?: Params;
    query?: Query;
    Component: Page<z.infer<Params>, z.infer<Query>>;
  }): FC<PageProps> =>
  props => {
    const validated =
      params !== undefined
        ? (params.parse(props.params) as z.infer<Params>)
        : ({} as unknown);

    const queryValidated =
      query !== undefined
        ? (query.parse(props.searchParams) as z.infer<Query>)
        : ({} as unknown);
    return Component({ params: validated, query: queryValidated, env });
  };
