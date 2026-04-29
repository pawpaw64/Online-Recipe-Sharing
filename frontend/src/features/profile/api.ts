import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import type { ApiResponse } from '@/types/api'
import type { AuthUser } from '@/features/auth/types'

export interface PublicProfile {
  id: string
  displayName: string | null
  avatarUrl: string | null
  bio: string | null
  createdAt: string
  _count: { recipes: number }
}

export const profileKeys = {
  public: (userId: string) => ['profile', userId] as const,
}

export function useProfile(userId: string) {
  return useQuery({
    queryKey: profileKeys.public(userId),
    queryFn: async () => {
      const res = await api.get<ApiResponse<PublicProfile>>(`/profile/${userId}`)
      return res.data.data
    },
    enabled: !!userId,
  })
}

export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data: { displayName?: string; bio?: string; avatarUrl?: string }) => {
      const res = await api.patch<ApiResponse<AuthUser>>('/profile', data)
      return res.data.data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })
}
