import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'
import { env } from '../config/env'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: { message: err.message, code: err.code },
    })
    return
  }

  // Multer errors
  if (err instanceof Error && err.message.startsWith('Invalid file type')) {
    res.status(400).json({
      success: false,
      error: { message: err.message, code: 'INVALID_FILE_TYPE' },
    })
    return
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  }

  res.status(500).json({
    success: false,
    error: { message: 'Internal server error', code: 'INTERNAL_ERROR' },
  })
}
