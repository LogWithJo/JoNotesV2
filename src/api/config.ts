export const API_CONFIG = {
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
	timeout: 10000,
	endpoints: {
		health: "/",
		auth: {
			continue: "/auth/continue",
		},
		notes: {
			base: "/notes",
			byId: (id: number) => `/notes/${id}`,
			pin: (id: number) => `/notes/${id}/pin`,
		},
	},
} as const;
