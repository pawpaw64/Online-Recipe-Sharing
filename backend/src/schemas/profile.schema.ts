import { z } from 'zod'

export const updateProfileSchema = z.object({
  body: z.object({
    displayName: z.string().min(2).max(100).optional(),
    bio: z.string().max(500).optional(),
    avatarUrl: z.string().url().max(500).optional(),
  }),
})
