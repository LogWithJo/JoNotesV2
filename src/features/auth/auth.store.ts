import type { AuthResponse, User } from "@/api/index";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
	token: string | null;
	user: User | null;
	setAuth: (auth: AuthResponse) => void;
	clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			token: null,
			user: null,
			setAuth: ({ token, user }) => set({ token, user }),
			clearAuth: () => set({ token: null, user: null }),
		}),
		{ name: "auth-storage" },
	),
);
