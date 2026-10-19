import { z } from "zod";

export const noteSchema = z.object({
	id: z.number(),
	title: z.string(),
	category: z.string(),
	content: z.string(),
	userId: z.number(),
	isPin: z.boolean(),
	createdAt: z.string().datetime(), // Validates ISO 8601 strings
	updatedAt: z.string().datetime(),
});

export const noteQueryParamsSchema = z.object({
	category: z.string().optional().default("all"),
	search: z.string().optional().default(""),
	sort: z.enum(["oldest", "az", "za"]).optional().default("az"),
	id: z.string().optional(),
});

export type NOteQueryParams = z.infer<typeof noteQueryParamsSchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notesArraySchema = z.array(noteSchema);

// Extract the inferred type for TypeScript usage
export type Note = z.infer<typeof noteSchema>;
export type createNoteData = z.infer<typeof noteSchema>;
export type NotesArray = z.infer<typeof notesArraySchema>;
