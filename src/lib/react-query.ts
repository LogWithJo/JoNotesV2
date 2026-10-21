import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ZodError } from "zod";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount: number, error: unknown) => {
				if (error instanceof ZodError) return false;
				if (isAxiosError(error)) {
					if (
						error.response?.status === 401 ||
						error.response?.status === 404
					) {
						return false;
					}
				}
				return failureCount < 2;
			},
			refetchOnWindowFocus: false,
			staleTime: Infinity,
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
			if (error instanceof ZodError) {
				console.error(`Zod validation error: ${error.message}`);
			}
			console.error(`Mutation error: ${error}`);
		},
	}),
});

export default queryClient;
