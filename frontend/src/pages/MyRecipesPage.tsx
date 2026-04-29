import { Link } from 'react-router-dom'
import { Trash2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RecipeGrid } from '@/components/shared/RecipeGrid'
import { useMyRecipes, useDeleteRecipe } from '@/features/recipes/api'

export default function MyRecipesPage() {
  const { data: recipes, isLoading } = useMyRecipes()
  const { mutate: deleteRecipe } = useDeleteRecipe()

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">My Recipes</h1>
        <Button asChild>
          <Link to="/post-recipe">+ New Recipe</Link>
        </Button>
      </div>

      {isLoading ? (
        <RecipeGrid isLoading />
      ) : !recipes?.length ? (
        <div className="py-16 text-center">
          <p className="mb-4 text-muted-foreground">You haven't posted any recipes yet.</p>
          <Button asChild>
            <Link to="/post-recipe">Share your first recipe</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="group relative">
              <Link to={`/recipes/${recipe.id}`} className="block">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  {recipe.imageUrl ? (
                    <img src={recipe.imageUrl} alt={recipe.title} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl">🍽️</div>
                  )}
                </div>
                <p className="mt-2 line-clamp-1 text-sm font-medium">{recipe.title}</p>
              </Link>
              <div className="absolute right-2 top-2 hidden gap-1 group-hover:flex">
                <Button asChild size="icon" variant="secondary" className="h-7 w-7">
                  <Link to={`/recipes/${recipe.id}/edit`}><Edit className="h-3.5 w-3.5" /></Link>
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-7 w-7"
                  onClick={() => deleteRecipe(recipe.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
