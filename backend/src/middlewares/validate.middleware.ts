import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ZodSchema, ZodError } from 'zod'
import { AppError } from '../utils/AppError'

type ValidatedRequest = {
  body?: unknown
  query?: unknown
  params?: unknown
}

export function validate(schema: ZodSchema<ValidatedRequest>): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    })

    if (!result.success) {
      const message = result.error.errors
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join('; ')
      return next(new AppError(message, 422, 'VALIDATION_ERROR'))
    }

    // Merge validated data back
    if (result.data.body !== undefined) req.body = result.data.body
    if (result.data.query !== undefined) (req as Request).query = result.data.query as typeof req.query
    if (result.data.params !== undefined) req.params = result.data.params as typeof req.params

    next()
  }
}
