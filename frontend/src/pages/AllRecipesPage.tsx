import { useState } from 'react'
import SearchFilter from '@/components/shared/SearchFilter'
import { RecipeGrid } from '@/components/shared/RecipeGrid'
import { Button } from '@/components/ui/button'
import { useRecipes } from '@/features/recipes/api'
import { useFavorites, useToggleFavorite } from '@/features/favorites/api'
import { useAuth } from '@/providers/AuthProvider'
import type { RecipeFilters } from '@/features/recipes/types'

export default function AllRecipesPage() {
  const { user } = useAuth()
  const [filters, setFilters] = useState<RecipeFilters>({ page: 1, limit: 12 })
  const { data, isLoading } = useRecipes(filters)
  const { data: favoriteIds } = useFavorites()
  const { mutate: toggleFavorite } = useToggleFavorite()

  const recipes = data?.data
  const meta = data?.meta

  return (
    <div className="container py-10">
      <h1 className="mb-6 font-display text-3xl font-bold">All Recipes</h1>

      <SearchFilter
        filters={filters}
        onChange={(f: RecipeFilters) => setFilters({ ...f, page: 1, limit: 12 })}
      />

      <div className="mt-8">
        <RecipeGrid
          recipes={recipes}
          isLoading={isLoading}
          favoriteIds={user ? favoriteIds : undefined}
          onToggleFavorite={user ? (id, cur) => toggleFavorite({ recipeId: id, isFavorited: cur }) : undefined}
        />
      </div>

      {meta && meta.page < meta.totalPages && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}
