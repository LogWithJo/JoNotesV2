import { API_CONFIG, useAuthStore } from "@/api/index";
import axios from "axios";
import queryClient from "../../src/lib/react-query.ts";

export const apiClient = axios.create({
	baseURL: API_CONFIG.baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

apiClient.interceptors.response.use(
	(res) => res,
	(error) => {
		const isContinue = error.config?.url?.includes("/continue");
		if (error.response?.status === 401 && !isContinue) {
			useAuthStore.getState().clearAuth();
			queryClient.clear();
		}
		return Promise.reject(error);
	},
);
