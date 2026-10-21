import type { NoteQueryParams } from "@/api/index";

export const noteKeys = {
	all: ["notes"] as const,
	list: (params?: NoteQueryParams) =>
		[...noteKeys.all, "list", params] as const,
	lists: () => [...noteKeys.all, "list"] as const,
	detail: (id: string) => [...noteKeys.all, "detail", id] as const,
};
