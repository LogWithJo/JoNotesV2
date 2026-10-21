// biome-ignore assist/source/organizeImports: <explanation>
import {
	API_CONFIG,
	apiClient,
	createNoteSchema,
	IdNoteSchema,
	noteQueryParamsSchema,
	noteSchema,
	updateNoteSchema,
	type createNoteData,
	type IdNoteParam,
	type Note,
	type NoteQueryParams,
	type UpdateNoteParams,
} from "@/api/index";
import { z } from "zod";

export const notesService = {
	getNotes: async (params: NoteQueryParams): Promise<Note[]> => {
		const validParams = noteQueryParamsSchema.safeParse(params);
		const response = await apiClient.get(API_CONFIG.endpoints.notes.base, {
			params: validParams,
		});
		return z.array(noteSchema).parse(response.data);
	},
	createNote: async (data: createNoteData): Promise<Note> => {
		const validPayload = createNoteSchema.safeParse(data);
		const response = await apiClient.post(API_CONFIG.endpoints.notes.base, {
			params: validPayload,
		});
		return noteSchema.parse(response.data);
	},
	updateNote: async (data: UpdateNoteParams): Promise<Note> => {
		const validPayload = updateNoteSchema.safeParse(data);
		const response = await apiClient.patch(API_CONFIG.endpoints.notes.base, {
			params: validPayload,
		});
		return noteSchema.parse(response.data);
	},
	deleteNote: async (data: IdNoteParam): Promise<{ success: boolean }> => {
		const validPayload = IdNoteSchema.safeParse(data);
		const response = await apiClient.delete(API_CONFIG.endpoints.notes.base, {
			params: validPayload.data,
		});
		return response.data;
	},
};
