import { HeroSection } from '@/features/recipes/components/HeroSection'
import { CategoryGrid } from '@/features/recipes/components/CategoryGrid'
import { PopularRecipes } from '@/features/recipes/components/PopularRecipes'
import { CreatorsSection } from '@/features/recipes/components/CreatorsSection'
import { ShareRecipeSection } from '@/features/recipes/components/ShareRecipeSection'
import { Newsletter } from '@/features/recipes/components/Newsletter'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <PopularRecipes />
      <CreatorsSection />
      <ShareRecipeSection />
      <Newsletter />
    </>
  )
}
