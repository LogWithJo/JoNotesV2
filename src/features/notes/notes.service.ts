// biome-ignore assist/source/organizeImports: <>
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
		const validParams = noteQueryParamsSchema.parse(params);
		const response = await apiClient.get(API_CONFIG.endpoints.notes.base, {
			params: validParams,
		});
		return z.array(noteSchema).parse(response.data);
	},
	createNote: async (data: createNoteData): Promise<Note> => {
		const validPayload = createNoteSchema.parse(data);
		const response = await apiClient.post(API_CONFIG.endpoints.notes.base, {
			params: validPayload,
		});
		return noteSchema.parse(response.data);
	},
	updateNote: async (data: UpdateNoteParams): Promise<Note> => {
		const validPayload = updateNoteSchema.parse(data);
		const response = await apiClient.patch(API_CONFIG.endpoints.notes.base, {
			params: validPayload,
		});
		return noteSchema.parse(response.data);
	},
	deleteNote: async (data: IdNoteParam) => {
		const validPayload = IdNoteSchema.parse(data);
		await apiClient.delete(API_CONFIG.endpoints.notes.byId(validPayload.id));
	},
	getNote: async (data: IdNoteParam): Promise<Note> => {
		const validPayload = IdNoteSchema.parse(data);
		const response = await apiClient.delete(
			API_CONFIG.endpoints.notes.byId(validPayload.id),
		);
		return noteSchema.parse(response.data);
	},
	patchPinNote: async (data: IdNoteParam): Promise<Note> => {
		const validPayload = IdNoteSchema.parse(data);
		const response = await apiClient.patch(
			API_CONFIG.endpoints.notes.pin(validPayload.id),
		);
		return noteSchema.parse(response.data);
	},
};
