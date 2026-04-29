import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { RecipeGrid } from '@/components/shared/RecipeGrid'
import { usePopularRecipes } from '@/features/recipes/api'
import { useFavorites, useToggleFavorite } from '@/features/favorites/api'
import { useAuth } from '@/providers/AuthProvider'

export function PopularRecipes() {
  const { user } = useAuth()
  const { data: recipes, isLoading } = usePopularRecipes()
  const { data: favoriteIds } = useFavorites()
  const { mutate: toggleFavorite } = useToggleFavorite()

  const handleToggle = (recipeId: string, isFavorited: boolean) => {
    if (!user) return
    toggleFavorite({ recipeId, isFavorited })
  }

  return (
    <section className="bg-muted/30 py-16">
      <div className="container">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Popular Recipes</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/recipes?sort=popular">View all →</Link>
          </Button>
        </div>

        <RecipeGrid
          recipes={recipes?.slice(0, 8)}
          isLoading={isLoading}
          favoriteIds={user ? favoriteIds : undefined}
          onToggleFavorite={user ? handleToggle : undefined}
        />
      </div>
    </section>
  )
}
