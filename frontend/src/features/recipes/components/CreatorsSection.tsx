import { motion } from "framer-motion";
import { Users, ExternalLink } from "lucide-react";
import { useRecipes } from "@/features/recipes/api";

const CreatorsSection = () => {
  const { data: recipesResponse } = useRecipes();
  const recipes = recipesResponse?.data ?? [];

  // Derive top creators from recipe data
  const creatorsMap = new Map<string, { name: string; avatar: string; recipeCount: number; topRecipe: string; topRecipeImage: string | null; totalLikes: number }>();
  
  for (const recipe of recipes) {
    const existing = creatorsMap.get(recipe.authorName);
    if (existing) {
      existing.recipeCount++;
      existing.totalLikes += recipe.likesCount;
      if (recipe.likesCount > (creatorsMap.get(recipe.authorName)?.totalLikes ?? 0) - recipe.likesCount) {
        existing.topRecipe = recipe.title;
        existing.topRecipeImage = recipe.imageUrl;
      }
    } else {
      creatorsMap.set(recipe.authorName, {
        name: recipe.authorName,
        avatar: recipe.authorAvatar ?? "",
        recipeCount: 1,
        topRecipe: recipe.title,
        topRecipeImage: recipe.imageUrl,
        totalLikes: recipe.likesCount,
      });
    }
  }

  const creators = Array.from(creatorsMap.values())
    .sort((a, b) => b.totalLikes - a.totalLikes)
    .slice(0, 4);

  if (creators.length === 0) return null;

  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Trending Creators</h2>
          <p className="text-sm text-muted-foreground mt-2">Follow the chefs shaping what we cook</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator, i) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-card shadow-card hover:shadow-card-hover bg-background p-5 text-center transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="font-display font-bold text-lg text-primary">{creator.avatar}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground">{creator.name}</h3>
              <span className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-1 tabular-nums">
                <Users className="w-3 h-3" /> {(creator.totalLikes / 1000).toFixed(1)}k likes
              </span>
              <div className="mt-4 flex items-center gap-2 p-2 rounded-card-inner bg-secondary/50">
                <img
                  src={creator.topRecipeImage ?? undefined}
                  alt={creator.topRecipe}
                  className="w-10 h-10 rounded-lg object-cover img-outline flex-shrink-0"
                />
                <span className="text-xs font-medium text-foreground truncate flex-1 text-left">{creator.topRecipe}</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorsSection;
