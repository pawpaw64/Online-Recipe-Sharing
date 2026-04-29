import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function ShareRecipeSection() {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container text-center">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Have a Recipe to Share?
        </h2>
        <p className="mx-auto mt-3 max-w-md opacity-90">
          Join our community of home cooks and share your favourite recipes with the world.
        </p>
        <Button asChild variant="secondary" size="lg" className="mt-6">
          <Link to="/post-recipe">Post Your Recipe</Link>
        </Button>
      </div>
    </section>
  )
}
