// src/api/config.ts

export const API_CONFIG = {
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
	timeout: 10000,
	endpoints: {
		health: "/",
		auth: {
			continue: "/auth/continue",
			login: "/auth/login",
			register: "/auth/register",
		},
		notes: {
			base: "/notes",
			byId: (id: number | string) => `/notes/${id}`,
			pin: (id: number | string) => `/notes/${id}/pin`,
		},
	},
} as const;
