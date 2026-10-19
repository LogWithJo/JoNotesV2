import type { NOteQueryParams } from "./notes.schemas";

export const noteKeys = {
	all: ["notes"] as const,
	list: (params?: NOteQueryParams) =>
		[...noteKeys.all, "list", params] as const,
	lists: () => [...noteKeys.all, "list"] as const,
	detail: (id: string) => [...noteKeys.all, "detail", id] as const,
};
