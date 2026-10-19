import { useQuery } from "@tanstack/react-query";
import { noteKeys } from "./notes.keys";
import type { NOteQueryParams } from "./notes.schemas";
import { notesService } from "./notes.service";

export const useGetNotes = (params: NOteQueryParams) => {
	return useQuery({
		queryKey: noteKeys.all,
		queryFn: () => notesService.getNotes(params),
	});
};
