import axios from "axios";
import { API_CONFIG } from "@/api/index"

export const apiClient = axios.create({
	baseURL: API_CONFIG.baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
);

