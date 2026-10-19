import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const responseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string().nullable(),
    avatar: z.string().nullable(), // Alternatively: z.string().url().nullable() if it's always an image URL
  }),
});

// Extract the inferred type for TypeScript usage
export type ResponseData = z.infer<typeof responseSchema>;