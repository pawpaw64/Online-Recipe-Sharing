import prisma from '../prisma/client'
import { hashPassword, comparePassword } from '../utils/hash'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt'
import { AppError } from '../utils/AppError'
import { REFRESH_TOKEN_TTL_MS } from '../config/constants'

interface RegisterInput {
  fullName: string
  email: string
  password: string
}

interface LoginInput {
  email: string
  password: string
}

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } })
  if (existing) {
    throw new AppError('Email already in use', 409, 'EMAIL_TAKEN')
  }

  const passwordHash = await hashPassword(input.password)
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      fullName: input.fullName,
      displayName: input.fullName,
    },
    select: { id: true, email: true, fullName: true, displayName: true, avatarUrl: true, bio: true, createdAt: true },
  })

  const accessToken = signAccessToken({ userId: user.id, email: user.email })
  const refreshToken = signRefreshToken({ userId: user.id, email: user.email })

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    },
  })

  return { user, accessToken, refreshToken }
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } })
  if (!user) {
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
  }

  const valid = await comparePassword(input.password, user.passwordHash)
  if (!valid) {
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
  }

  const accessToken = signAccessToken({ userId: user.id, email: user.email })
  const refreshToken = signRefreshToken({ userId: user.id, email: user.email })

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    },
  })

  const { passwordHash: _, ...safeUser } = user
  return { user: safeUser, accessToken, refreshToken }
}

export async function refresh(cookieToken: string) {
  let payload: { userId: string; email: string }
  try {
    payload = verifyRefreshToken(cookieToken)
  } catch {
    throw new AppError('Invalid refresh token', 401, 'INVALID_TOKEN')
  }

  const stored = await prisma.refreshToken.findUnique({ where: { token: cookieToken } })
  if (!stored || stored.expiresAt < new Date()) {
    throw new AppError('Refresh token expired or not found', 401, 'TOKEN_EXPIRED')
  }

  const newAccessToken = signAccessToken({ userId: payload.userId, email: payload.email })
  const newRefreshToken = signRefreshToken({ userId: payload.userId, email: payload.email })

  await prisma.$transaction([
    prisma.refreshToken.delete({ where: { id: stored.id } }),
    prisma.refreshToken.create({
      data: {
        userId: payload.userId,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
      },
    }),
  ])

  return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}

export async function logout(cookieToken: string) {
  await prisma.refreshToken.deleteMany({ where: { token: cookieToken } })
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      displayName: true,
      avatarUrl: true,
      bio: true,
      createdAt: true,
    },
  })
  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND')
  return user
}
