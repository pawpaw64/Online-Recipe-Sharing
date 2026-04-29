import { RecipeCard } from './RecipeCard'
import { Skeleton } from '@/components/ui/skeleton'
import type { Recipe } from '@/features/recipes/types'

interface RecipeGridProps {
  recipes?: Recipe[]
  isLoading?: boolean
  favoriteIds?: string[]
  onToggleFavorite?: (id: string, current: boolean) => void
}

export function RecipeGrid({ recipes, isLoading, favoriteIds, onToggleFavorite }: RecipeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (!recipes?.length) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        No recipes found.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorited={favoriteIds?.includes(recipe.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
