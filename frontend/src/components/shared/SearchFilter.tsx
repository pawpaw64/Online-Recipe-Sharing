import { motion } from "framer-motion";
import type { RecipeFilters } from "@/features/recipes/types";

const categories = [
  "All", "Breakfast", "Lunch", "Dinner", "Snacks",
  "Appetizers", "Salads", "Soups", "Quick & Easy",
  "Healthy", "Vegan", "Gluten-Free",
];

interface SearchFilterProps {
  filters: RecipeFilters;
  onChange: (filters: RecipeFilters) => void;
}

const SearchFilter = ({ filters, onChange }: SearchFilterProps) => {
  const activeCategory = filters.category ?? "All";

  const handleCategory = (cat: string) => {
    onChange({ ...filters, category: cat === "All" ? undefined : cat });
  };

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategory(cat)}
              className="relative px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors"
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 ${activeCategory === cat ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
