import { Link } from 'react-router-dom'
import { CATEGORIES } from '@/lib/constants'

const CATEGORY_EMOJI: Record<string, string> = {
  Breakfast: '🍳',
  Lunch: '🥗',
  Dinner: '🍝',
  Desserts: '🍰',
  Snacks: '🥨',
  Vegetarian: '🥦',
  Seafood: '🦞',
  Drinks: '🍹',
}

export function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="mb-8 text-center font-display text-2xl font-bold sm:text-3xl">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/recipes?category=${cat}`}
              className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 transition-all hover:border-primary hover:shadow-sm"
            >
              <span className="text-3xl">{CATEGORY_EMOJI[cat] ?? '🍴'}</span>
              <span className="text-xs font-medium">{cat}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
