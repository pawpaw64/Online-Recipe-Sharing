import { Request, Response } from 'express'
import * as authService from '../services/auth.service'
import { env } from '../config/env'
import { REFRESH_TOKEN_TTL_MS } from '../config/constants'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: REFRESH_TOKEN_TTL_MS,
  path: '/',
}

export async function register(req: Request, res: Response): Promise<void> {
  const { user, accessToken, refreshToken } = await authService.register(req.body)
  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
  res.status(201).json({ success: true, data: { user, accessToken } })
}

export async function login(req: Request, res: Response): Promise<void> {
  const { user, accessToken, refreshToken } = await authService.login(req.body)
  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
  res.json({ success: true, data: { user, accessToken } })
}

export async function refresh(req: Request, res: Response): Promise<void> {
  const token = req.cookies?.refreshToken as string | undefined
  if (!token) {
    res.status(401).json({ success: false, error: { message: 'No refresh token', code: 'NO_TOKEN' } })
    return
  }
  const { accessToken, refreshToken } = await authService.refresh(token)
  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
  res.json({ success: true, data: { accessToken } })
}

export async function logout(req: Request, res: Response): Promise<void> {
  const token = req.cookies?.refreshToken as string | undefined
  if (token) await authService.logout(token)
  res.clearCookie('refreshToken', { path: '/' })
  res.json({ success: true, data: null })
}

export async function me(req: Request, res: Response): Promise<void> {
  const user = await authService.getMe(req.user!.userId)
  res.json({ success: true, data: user })
}
