import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from '../config/constants'

export interface JwtPayload {
  userId: string
  email: string
}

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL })
}

export function signRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_TTL })
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as JwtPayload
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as JwtPayload
}
