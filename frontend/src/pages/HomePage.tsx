import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/features/recipes/components/HeroSection";
import PopularRecipes from "@/features/recipes/components/PopularRecipes";
import CategoryGrid from "@/features/recipes/components/CategoryGrid";
import ShareRecipeSection from "@/features/recipes/components/ShareRecipeSection";
import CreatorsSection from "@/features/recipes/components/CreatorsSection";
import Newsletter from "@/features/recipes/components/Newsletter";



// home page with hero, popular recipes, categories, creators, share recipe, newsletter sections and footer


const HomePage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const sectionId = location.hash.replace("#", "");
    const section = document.getElementById(sectionId);
    if (!section) return;
    const timer = window.setTimeout(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. Hero Section */}
      <section id="home" className="scroll-mt-24">
        <HeroSection />
      </section>

      {/* 2. Today's Top Recipes (4-5 Cards) */}
      <section id="popular" className="scroll-mt-24 bg-secondary/10">
        <PopularRecipes />
      </section>

      {/* 3. Recipe Categories with picture filters */}
      <section id="categories" className="scroll-mt-24">
        <CategoryGrid />
      </section>

      {/* 4. Trending Creators */}
      <section id="creators" className="scroll-mt-24 border-t border-border bg-background">
        <CreatorsSection />
      </section>

      {/* 5. Share Recipe */}
      <ShareRecipeSection />

      {/* 6. Newsletter / About */}
      <section id="about" className="scroll-mt-24">
        <Newsletter />
      </section>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-card hover:opacity-90 transition-opacity z-40"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default HomePage;


