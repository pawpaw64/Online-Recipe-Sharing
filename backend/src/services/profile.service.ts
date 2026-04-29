import prisma from '../prisma/client'
import { AppError } from '../utils/AppError'

export async function getPublicProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      displayName: true,
      avatarUrl: true,
      bio: true,
      createdAt: true,
      _count: { select: { recipes: true } },
    },
  })
  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND')
  return user
}

interface UpdateProfileInput {
  displayName?: string
  bio?: string
  avatarUrl?: string
}

export async function updateProfile(userId: string, input: UpdateProfileInput) {
  return prisma.user.update({
    where: { id: userId },
    data: input,
    select: {
      id: true,
      email: true,
      fullName: true,
      displayName: true,
      avatarUrl: true,
      bio: true,
      updatedAt: true,
    },
  })
}
