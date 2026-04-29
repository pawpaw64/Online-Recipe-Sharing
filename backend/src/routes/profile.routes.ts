import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { validate } from '../middlewares/validate.middleware'
import { requireAuth } from '../middlewares/auth.middleware'
import { updateProfileSchema } from '../schemas/profile.schema'
import * as profileController from '../controllers/profile.controller'

const router = Router()

router.get('/:userId', asyncHandler(profileController.getProfile))
router.patch('/', requireAuth, validate(updateProfileSchema), asyncHandler(profileController.updateProfile))

export default router
