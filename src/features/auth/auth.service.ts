import {
	API_CONFIG,
	apiClient,
	type ContinueData,
	requestSchema,
} from "@/api/index";

export const authService = {
	continue: async (data: ContinueData) => {
		const validPayload = requestSchema.parse(data);
		const response = await apiClient.post(API_CONFIG.endpoints.auth.continue, {
			params: validPayload,
		});
		return response.data;
	},
};
