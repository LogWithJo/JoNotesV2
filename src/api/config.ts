const getEnvVar = (key: string) => {
    // Check Vite's import.meta.env safely
    if (typeof import.meta !== "undefined" && import.meta.env?.[key]) {
        return import.meta.env[key];
    }
    // Check Node.js process.env safely without TypeScript errors
    const globalProcess = (globalThis as Record<string, any>).process;
    if (globalProcess?.env?.[key]) {
        return globalProcess.env[key];
    }
    return undefined;
};

export const API_CONFIG = {
    baseURL: getEnvVar("VITE_API_BASE_URL") || "http://localhost:3000",
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
