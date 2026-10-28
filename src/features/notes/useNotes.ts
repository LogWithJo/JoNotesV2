/** biome-ignore-all assist/source/organizeImports: <explanation> */
import {
	noteKeys,
	notesService,
	type createNoteData,
	type IdNoteParam,
	type NoteQueryParams,
	type UpdateNoteParams,
} from "@/api/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Queries

export const useGetNotes = (params: NoteQueryParams) => {
	return useQuery({
		queryKey: noteKeys.list(params),
		queryFn: () => notesService.getNotes(params),
		throwOnError: true,
	});
};

export const useGetNote = (data: IdNoteParam) => {
	return useQuery({
		queryKey: noteKeys.detail(data),
		queryFn: () => notesService.getNote(data),
		throwOnError: true,
	});
};

// Mutations

export const useCreateNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: createNoteData) => notesService.createNote(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
		},
	});
};

export const useUpdateNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: UpdateNoteParams) => notesService.updateNote(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: noteKeys.details() });
			queryClient.invalidateQueries({queryKey: noteKeys.lists() })
		},
	});
};

export const useDeleteNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: IdNoteParam) => notesService.deleteNote(data),
		onSuccess: (_result, variables) => {
			queryClient.removeQueries({ queryKey: noteKeys.detail(variables) });
			queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
		},
	});
};

export const usePatchPinNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: IdNoteParam) => notesService.patchPinNote(data),
		onSuccess: (_result, data: IdNoteParam,) => {
			queryClient.invalidateQueries({ queryKey: noteKeys.detail(data) });
			queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
		},
	});
};
