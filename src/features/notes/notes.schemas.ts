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

export const createNoteSchema = noteSchema
	.pick({
		title: true,
		category: true,
		content: true,
	})
	.partial({
		content: true,
	});

export const updateNoteSchema = noteSchema.pick({
	title: true,
	content: true,
	category: true,
	id: true,
});

export const IdNoteSchema = noteSchema.pick({
	id: true,
});

export type NoteQueryParams = z.infer<typeof noteQueryParamsSchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notesArraySchema = z.array(noteSchema);

// Extract the inferred type for TypeScript usage
export type IdNoteParam = z.infer<typeof IdNoteSchema>;
export type UpdateNoteParams = z.infer<typeof updateNoteSchema>;
export type Note = z.infer<typeof noteSchema>;
export type createNoteData = z.infer<typeof createNoteSchema>;
export type NotesArray = z.infer<typeof notesArraySchema>;
