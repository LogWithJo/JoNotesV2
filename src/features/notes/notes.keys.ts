import type { IdNoteParam, NoteQueryParams } from "@/api/index";

export const noteKeys = {
	all: ["notes"] as const,
	
	lists: () => [...noteKeys.all, "list"] as const,
	list: (params: NoteQueryParams) => [...noteKeys.lists(), params] as const,

	details: () => [...noteKeys.all, "detail"] as const,
	detail: (id: IdNoteParam) => [...noteKeys.details(), id.id] as const,
};
