import { Router } from 'express'
import authRoutes from './auth.routes'
import recipeRoutes from './recipe.routes'
import favoriteRoutes from './favorite.routes'
import commentRoutes from './comment.routes'
import profileRoutes from './profile.routes'
import uploadRoutes from './upload.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/recipes', recipeRoutes)
router.use('/favorites', favoriteRoutes)
router.use('/comments', commentRoutes)
router.use('/profile', profileRoutes)
router.use('/upload', uploadRoutes)

export default router
