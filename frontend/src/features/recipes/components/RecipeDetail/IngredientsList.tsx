import type { Ingredient } from '@/features/recipes/types'

interface IngredientsListProps {
  ingredients: Ingredient[]
  servings?: number
}

export function IngredientsList({ ingredients, servings }: IngredientsListProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="mb-4 font-display text-lg font-semibold">
        Ingredients{servings ? ` (${servings} servings)` : ''}
      </h3>
      <ul className="space-y-2">
        {ingredients
          .slice()
          .sort((a, b) => a.position - b.position)
          .map((ing) => (
            <li key={ing.id} className="flex items-start gap-2 text-sm">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              {ing.item}
            </li>
          ))}
      </ul>
    </div>
  )
}
