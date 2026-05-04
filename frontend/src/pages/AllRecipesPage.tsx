import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchFilter from '@/components/shared/SearchFilter'
import { RecipeGrid } from '@/components/shared/RecipeGrid'
import { Button } from '@/components/ui/button'
import { useRecipes } from '@/features/recipes/api'
import { useFavorites, useToggleFavorite } from '@/features/favorites/api'
import { useAuth } from '@/providers/AuthProvider'
import type { RecipeFilters } from '@/features/recipes/types'

export default function AllRecipesPage() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const urlFilters = useMemo(
    () => ({
      search: searchParams.get('search') ?? undefined,
      category: searchParams.get('category') ?? undefined,
      authorId: searchParams.get('author') ?? undefined,
    }),
    [searchParams],
  )
  const [filters, setFilters] = useState<RecipeFilters>({
    page: 1,
    limit: 12,
    search: urlFilters.search,
    category: urlFilters.category,
    authorId: urlFilters.authorId,
  })

  useEffect(() => {
    setFilters((prev) => {
      const next: RecipeFilters = {
        ...prev,
        page: 1,
        limit: 12,
        search: urlFilters.search,
        category: urlFilters.category,
        authorId: urlFilters.authorId,
      }

      if (
        prev.search === next.search &&
        prev.category === next.category &&
        prev.authorId === next.authorId &&
        prev.page === next.page &&
        prev.limit === next.limit
      ) {
        return prev
      }

      return next
    })
  }, [urlFilters])

  const { data, isLoading } = useRecipes(filters)
  const { data: favoriteIds } = useFavorites()
  const { mutate: toggleFavorite } = useToggleFavorite()

  const recipes = data?.data
  const meta = data?.meta

  return ( /* All Recipes logo*/
    <div className="container py-16">
      <h1 className="mb-0 font-display text-4xl font-bold text-center text-primary">
        {urlFilters.authorId
          ? (recipes?.[0]?.authorName ? `${recipes[0].authorName}'s Recipes` : 'Creator Recipes')
          : 'All Recipes'} 
      </h1>

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
