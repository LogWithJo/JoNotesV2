import normalizeError from "@/api/errors";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { ZodError } from "zod";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 5,
		},
	},
	queryCache: new QueryCache({
		onError: (error) => {
			if (error instanceof ZodError) {
				console.error(`Zod validation error: ${error.message}`);
			}
			console.error(`Query error: ${error}`);
		},
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			console.log(normalizeError(error));
		},
	}),
});

export default queryClient;
