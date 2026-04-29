import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categoriesWithImages = [
  { name: "Breakfast", count: 86, emoji: "🥞", gradient: "from-amber-400 to-orange-500" },
  { name: "Lunch", count: 124, emoji: "🌮", gradient: "from-green-400 to-emerald-600" },
  { name: "Dinner", count: 203, emoji: "🍝", gradient: "from-red-400 to-rose-600" },
  { name: "Desserts", count: 97, emoji: "🍰", gradient: "from-pink-400 to-purple-500" },
  { name: "Healthy", count: 156, emoji: "🥗", gradient: "from-lime-400 to-green-500" },
  { name: "Quick & Easy", count: 178, emoji: "🍜", gradient: "from-yellow-400 to-amber-500" },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-4xl font-display font-bold text-foreground">
            Explore by Category
          </h2>
          <p className="text-sm lg:text-base text-muted-foreground mt-2">
            Find exactly what you're craving with our curated collections
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesWithImages.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/recipes?category=${encodeURIComponent(cat.name)}`)}
              className="group relative rounded-card overflow-hidden cursor-pointer aspect-[3/4] shadow-card hover:shadow-card-hover transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl">{cat.emoji}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display font-semibold text-base text-white">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/80 tabular-nums font-medium mt-0.5">
                  {cat.count} recipes
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
