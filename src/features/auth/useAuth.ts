import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService, useAuthStore } from "@/api/index"

export const useContinue = () => {
    const setAuth = useAuthStore(s => s.setAuth)
    return useMutation({
        mutationFn: authService.continue,
        onSuccess: (auth) => setAuth(auth)
    })
}

export const useLogout = () => {
    const clearAuth = useAuthStore(s => s.clearAuth)
    const queryClient = useQueryClient()
    return () => {
        clearAuth();
        queryClient.clear()
    }
}