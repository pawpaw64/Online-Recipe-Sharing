import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useRecipes } from '@/features/recipes/api'
import { useFavorites, useToggleFavorite } from '@/features/favorites/api'
import { useAuth } from '@/providers/AuthProvider'
import { RecipeGrid } from '@/components/shared/RecipeGrid'
import { Button } from '@/components/ui/button'
import type { RecipeFilters } from '@/features/recipes/types'

const CATEGORIES = [
  { name: 'Breakfast', emoji: '🍳', description: 'Start your day right', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop' },
  { name: 'Lunch', emoji: '🥗', description: 'Midday fuel', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop' },
  { name: 'Dinner', emoji: '🍲', description: 'Evening indulgence', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop' },
  { name: 'Desserts', emoji: '🍰', description: 'Sweet endings', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop' },
  { name: 'Healthy', emoji: '🥦', description: 'Nourish your body', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop' },
  { name: 'Quick & Easy', emoji: '⚡', description: 'Ready in minutes', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&auto=format&fit=crop' },
  { name: 'Vegetarian', emoji: '🌿', description: 'Plant-powered meals', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop' },
  { name: 'Soups', emoji: '🍜', description: 'Warming bowls', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop' },
]

export default function CategoriesPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') ?? ''

  const [selected, setSelected] = useState(categoryParam)
  const [filters, setFilters] = useState<RecipeFilters>({ page: 1, limit: 12, category: categoryParam || undefined })

  const { data, isLoading } = useRecipes(filters)
  const { data: favoriteIds } = useFavorites()
  const { mutate: toggleFavorite } = useToggleFavorite()

  const recipes = data?.data
  const meta = data?.meta

  useEffect(() => {
    const cat = searchParams.get('category') ?? ''
    setSelected(cat)
    setFilters({ page: 1, limit: 12, category: cat || undefined })
  }, [searchParams])

  const handleSelect = (name: string) => {
    if (name === selected) return
    if (name) {
      setSearchParams({ category: name })
    } else {
      setSearchParams({})
    }
  }

  const handleClear = () => setSearchParams({})

  const activeCategory = CATEGORIES.find((c) => c.name === selected)

  return (
    <div className="min-h-screen bg-background">

      {/* Hero banner */}
      <div className="relative overflow-hidden bg-secondary/30 pt-10 pb-14">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/6 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-primary uppercase tracking-wider mb-2"
          >
            Explore
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl lg:text-5xl font-display font-bold text-foreground"
          >
            Recipe Categories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-base lg:text-lg max-w-xl mx-auto"
          >
            Browse our curated collections — pick a category and discover dishes you'll love.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">

        {/* Category cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          {CATEGORIES.map((cat, i) => {
            const isActive = selected === cat.name
            return (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => handleSelect(cat.name)}
                className={`group relative rounded-2xl overflow-hidden aspect-[3/2] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all ${
                  isActive ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : 'shadow-sm hover:shadow-md'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {isActive && (
                  <motion.div
                    layoutId="category-active-ring"
                    className="absolute inset-0 bg-primary/20 rounded-2xl"
                  />
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="font-semibold text-sm text-white">{cat.name}</span>
                  </div>
                  <p className="text-[11px] text-white/70 mt-0.5">{cat.description}</p>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Breadcrumb / section title */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key="category-header"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-3 mb-6"
            >
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> All categories
              </button>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <span>{activeCategory?.emoji}</span>
                <span>{selected}</span>
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="all-header"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <h2 className="text-xl font-display font-bold text-foreground">All Recipes</h2>
              <p className="text-sm text-muted-foreground mt-1">Select a category above to filter</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recipe grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <RecipeGrid
              recipes={recipes}
              isLoading={isLoading}
              favoriteIds={user ? favoriteIds : undefined}
              onToggleFavorite={
                user
                  ? (id, cur) => toggleFavorite({ recipeId: id, isFavorited: cur })
                  : undefined
              }
            />
          </motion.div>
        </AnimatePresence>

        {/* Load more */}
        {meta && meta.page < meta.totalPages && (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              className="rounded-full px-8"
              onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
            >
              Load more
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && recipes?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-5xl mb-4">🍽️</p>
            <h3 className="text-lg font-semibold text-foreground mb-1">No recipes yet</h3>
            <p className="text-muted-foreground text-sm mb-5">
              Be the first to post a{selected ? ` ${selected}` : ''} recipe!
            </p>
            <Button className="rounded-full" onClick={() => navigate('/post-recipe')}>
              Post a Recipe
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}
