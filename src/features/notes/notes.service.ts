// biome-ignore assist/source/organizeImports: <explanation>
import apiClient from "@/api/client";
import { z } from "zod";
import { type createNoteData, type Note, type NOteQueryParams, noteQueryParamsSchema, noteSchema } from "./notes.schemas";

export const notesService = {
	getNotes: async (params: NOteQueryParams): Promise<Note[]> => {
		const validParams = noteQueryParamsSchema.safeParse(params);
		if (!validParams.success) {
			throw new Error("Invalid note query params");
		}
		const response = await apiClient.get("/notes", {params: validParams});
		return z.array(noteSchema).parse(response.data);
	},
	createNote: async (data: createNoteData): Promise<Note> => {
		const validPayload = noteSchema.safeParse(data);
		if (!validPayload.success) {
			throw new Error("Invalid note data");
		}
		const response = await apiClient.post("/notes", validPayload.data);
		return noteSchema.parse(response.data);
	},
};
