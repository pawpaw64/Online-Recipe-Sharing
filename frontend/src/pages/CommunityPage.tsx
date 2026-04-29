import { useState } from 'react'
import { SearchFilter } from '@/components/shared/SearchFilter'
import { RecipeGrid } from '@/components/shared/RecipeGrid'
import { useRecipes } from '@/features/recipes/api'
import { useFavorites, useToggleFavorite } from '@/features/favorites/api'
import { useAuth } from '@/providers/AuthProvider'
import type { RecipeFilters } from '@/features/recipes/types'

export default function CommunityPage() {
  const { user } = useAuth()
  const [filters, setFilters] = useState<RecipeFilters>({ page: 1, limit: 12 })
  const { data, isLoading } = useRecipes(filters)
  const { data: favoriteIds } = useFavorites()
  const { mutate: toggleFavorite } = useToggleFavorite()

  return (
    <div className="container py-10">
      <h1 className="mb-2 font-display text-3xl font-bold">Community Recipes</h1>
      <p className="mb-6 text-muted-foreground">Discover recipes shared by home cooks from around the world.</p>

      <SearchFilter
        filters={filters}
        onChange={(f) => setFilters({ ...f, page: 1, limit: 12 } as RecipeFilters)}
      />

      <div className="mt-8">
        <RecipeGrid
          recipes={data?.data}
          isLoading={isLoading}
          favoriteIds={user ? favoriteIds : undefined}
          onToggleFavorite={user ? (id, cur) => toggleFavorite({ recipeId: id, isFavorited: cur }) : undefined}
        />
      </div>
    </div>
  )
}
