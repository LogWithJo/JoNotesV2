import { isAxiosError } from 'axios';
import z, { ZodError } from 'zod';

const errorSchema = z.object({
    error: z.string()
});

type AppError = { message: string, status?: number };

export default function normalizeError(error: unknown): AppError {
    if (isAxiosError(error)) {
        // Situation 1: No response at all (real network problem)
        if (!error.response) {
            return { message: "no wifi" };
        }

        const payload = errorSchema.safeParse(error.response.data);
        if (payload.success) {
            return { message: payload.data.error, status: error.response.status };
        } 
        
        // Situation 2: A response without a usable error field (e.g., HTML 500)
        return { message: "An unexpected server error occurred", status: error.response.status };
    }
    
    if (error instanceof ZodError) {
        return { message: "type error!! try again" };
    }
    
    // Situation 3: An unknown error that is neither Axios nor Zod
    return { message: "An unknown application error occurred" };
}