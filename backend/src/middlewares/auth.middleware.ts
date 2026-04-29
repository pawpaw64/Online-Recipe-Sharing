import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt'
import { AppError } from '../utils/AppError'

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'))
  }

  const token = authHeader.slice(7)
  try {
    const payload = verifyAccessToken(token)
    req.user = { userId: payload.userId, email: payload.email }
    next()
  } catch {
    next(new AppError('Invalid or expired token', 401, 'INVALID_TOKEN'))
  }
}
