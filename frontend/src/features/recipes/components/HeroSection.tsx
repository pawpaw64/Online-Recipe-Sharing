import { Link } from 'react-router-dom'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const reduce = useReducedMotion()
  const variants: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
      }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-background py-20 dark:from-orange-950/20 dark:via-amber-950/20">
      <div className="container text-center">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
        >
          Simple &amp; Tasty Recipes
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Discover &amp; Share<br />
          <span className="text-primary">Delicious Recipes</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="mx-auto mt-4 max-w-xl text-muted-foreground sm:text-lg"
        >
          Explore thousands of recipes from talented home cooks. Find your next favourite
          meal or share your own culinary creations.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button asChild size="lg">
            <Link to="/recipes">Browse Recipes</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/post-recipe">Share a Recipe</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
