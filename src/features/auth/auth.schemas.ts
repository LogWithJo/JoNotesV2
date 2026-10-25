import { z } from "zod";

export const requestSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export const userSchema = z.object({
	id: z.number(),
	email: z.string().email(),
	name: z.string().nullable(),
	avatar: z.string().nullable(),
});

export const responseSchema = z.object({
	token: z.string(),
	user: userSchema,
});

export type ContinueData = z.infer<typeof requestSchema>;
export type User = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof responseSchema>;
