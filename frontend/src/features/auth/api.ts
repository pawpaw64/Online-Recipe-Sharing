import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import type { ApiResponse } from '@/types/api'
import type { AuthUser, LoginInput, RegisterInput } from './types'

export const authKeys = {
  me: ['auth', 'me'] as const,
}

export function useMe() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: async () => {
      const res = await api.get<ApiResponse<AuthUser>>('/auth/me')
      return res.data.data
    },
    enabled: false,
    retry: false,
  })
}

export function useLogin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const res = await api.post<ApiResponse<{ user: AuthUser; accessToken: string }>>('/auth/login', input)
      return res.data.data
    },
    onSuccess: (data) => {
      qc.setQueryData(authKeys.me, data.user)
    },
  })
}

export function useRegister() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const res = await api.post<ApiResponse<{ user: AuthUser; accessToken: string }>>('/auth/register', input)
      return res.data.data
    },
    onSuccess: (data) => {
      qc.setQueryData(authKeys.me, data.user)
    },
  })
}

export function useLogout() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout')
    },
    onSuccess: () => {
      qc.clear()
    },
  })
}
