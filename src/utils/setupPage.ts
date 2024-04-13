import type { FC, JSX, ReactNode } from "react";
import type { LayoutProps, PageProps } from "src/types/router";
import type { z, ZodSchema } from "zod";

type Page<T, C> = ({
	params,
	query,
}: {
	params: T;
	query: C;
}) => Promise<JSX.Element> | JSX.Element;

export const setupPage =
	<Params extends ZodSchema, Query extends ZodSchema>({
		params,
		query,
		Component,
	}: {
		params?: Params;
		query?: Query;
		Component: Page<z.infer<Params>, z.infer<Query>>;
	}): FC<PageProps> =>
	(props) => {
		const validated =
			params !== undefined
				? (params.parse(props.params) as z.infer<Params>)
				: ({} as unknown);

		const queryValidated =
			query !== undefined
				? (query.parse(props.searchParams) as z.infer<Query>)
				: ({} as unknown);
		return Component({ params: validated, query: queryValidated });
	};

type Layout<T, C> = ({
	params,
	query,
	children,
}: {
	params: T;
	query: C;
	children: ReactNode;
}) => Promise<JSX.Element> | JSX.Element;

export const setupLayout =
	<Params extends ZodSchema, Query extends ZodSchema>({
		params,
		query,
		Component,
	}: {
		params?: Params;
		query?: Query;
		Component: Layout<z.infer<Params>, z.infer<Query>>;
	}): FC<LayoutProps> =>
	(props) => {
		const validated =
			params !== undefined
				? (params.parse(props.params) as z.infer<Params>)
				: ({} as unknown);

		const queryValidated =
			query !== undefined
				? (query.parse(props.searchParams) as z.infer<Query>)
				: ({} as unknown);
		return Component({
			params: validated,
			children: props.children,
			query: queryValidated,
		});
	};

type Loading = ({
	children,
}: {
	children: ReactNode;
}) => Promise<JSX.Element> | JSX.Element;

export const setupLoading =
	({ Component }: { Component: Loading }): FC<LayoutProps> =>
	(props) => {
		return Component({
			children: props.children,
		});
	};
