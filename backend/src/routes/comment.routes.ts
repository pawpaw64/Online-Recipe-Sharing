import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { validate } from '../middlewares/validate.middleware'
import { requireAuth } from '../middlewares/auth.middleware'
import { createCommentSchema, updateCommentSchema } from '../schemas/comment.schema'
import * as commentController from '../controllers/comment.controller'

const router = Router()

router.get('/recipe/:id', asyncHandler(commentController.getByRecipe))
router.post('/recipe/:id', requireAuth, validate(createCommentSchema), asyncHandler(commentController.create))
router.patch('/:id', requireAuth, validate(updateCommentSchema), asyncHandler(commentController.update))
router.delete('/:id', requireAuth, asyncHandler(commentController.remove))

export default router
