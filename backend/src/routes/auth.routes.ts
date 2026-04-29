import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { validate } from '../middlewares/validate.middleware'
import { requireAuth } from '../middlewares/auth.middleware'
import { authRateLimiter } from '../middlewares/rateLimiter.middleware'
import { registerSchema, loginSchema } from '../schemas/auth.schema'
import * as authController from '../controllers/auth.controller'

const router = Router()

router.post('/register', authRateLimiter, validate(registerSchema), asyncHandler(authController.register))
router.post('/login', authRateLimiter, validate(loginSchema), asyncHandler(authController.login))
router.post('/refresh', authRateLimiter, asyncHandler(authController.refresh))
router.post('/logout', requireAuth, asyncHandler(authController.logout))
router.get('/me', requireAuth, asyncHandler(authController.me))

export default router
