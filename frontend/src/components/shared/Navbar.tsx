import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  LogOut,
  Menu,
  PlusCircle,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import cookbookLogo from "@/assets/CookBook_logo_cropped.png";
import cookbookLogoDark from "@/assets/CookBook_logo_cropped_dark.png";

const navLinks = [
  { label: "Home", href: "/", section: "home" },
  { label: "Recipes", href: "/recipes", section: "recipes" },
  { label: "Categories", href: "/categories", section: "categories" },
  { label: "Community", href: "/community", section: "community" },
  { label: "About", href: "/#about", section: "about" },
];

const AuthActionsSkeleton = ({ mobile = false }: { mobile?: boolean }) => {
  if (mobile) {
    return (
      <div className="space-y-3 pt-2">
        <Skeleton className="h-10 w-full rounded-full" />
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-16 rounded-full" />
      <Skeleton className="h-8 w-28 rounded-full" />
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const { user, loading, signOut } = useAuth();
  const isAuthenticated = !!user;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname === "/recipes") {
      const params = new URLSearchParams(location.search);
      setSearchQuery(params.get("search") ?? "");
      return;
    }
    setSearchQuery("");
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }
    if (location.hash) {
      setActiveSection(location.hash.replace("#", ""));
    } else {
      setActiveSection("home");
    }
    const sectionIds = navLinks.map((link) => link.section);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.2, 0.4, 0.6] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname, location.hash]);

  const displayName =
    user?.fullName || user?.displayName || user?.email?.split("@")[0] || "User";
  const avatarUrl = user?.avatarUrl ?? undefined;
  const email = user?.email ?? "hello@cookbook.local";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isNavItemActive = (section: string, href: string) => {
    if (href.startsWith("/#")) return location.pathname === "/" && activeSection === section;
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleNavigate = (href: string) => navigate(href);

  const handleLogout = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/recipes?search=${encodeURIComponent(q)}`);
    setSearchQuery(q);
    searchRef.current?.blur();
  };

  const handleClearSearch = () => {
    setSearchQuery("");

    if (location.pathname !== "/recipes") {
      return;
    }

    const params = new URLSearchParams(location.search);
    if (!params.has("search")) {
      return;
    }

    params.delete("search");
    const nextQuery = params.toString();
    navigate(nextQuery ? `/recipes?${nextQuery}` : "/recipes", { replace: true });
  };

  const navBg = scrolled
    ? "bg-[#F2EEE8]/95 dark:bg-background/95 backdrop-blur-md shadow-sm"
    : "bg-[#F2EEE8] dark:bg-background";

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/60", navBg)}>

      {/* ── Row 1: Logo · Search · Auth (Desktop Layout) ──────────────────────────────── */}
      <div className="container mx-auto flex items-center justify-center gap-4 px-4 lg:px-8 h-16 lg:h-20">
        
        {/* Left: Logo - Larger size */}
        <Link to="/" className="shrink-0 flex items-center group">
          <img 
            src={cookbookLogo} 
            alt="CookBook" 
            className="block h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 dark:hidden" 
            loading="eager" 
          />
          <img 
            src={cookbookLogoDark} 
            alt="CookBook" 
            className="hidden h-20   w-auto object-contain transition-transform duration-300 group-hover:scale-105 dark:block" 
            loading="eager" 
          />
        </Link>

        {/* Center: Search bar - Prominent and wide */}
        <form
          onSubmit={handleSearch}
          className={cn(
            "hidden md:flex flex-1 max-w-2xl mx-auto items-center gap-3 rounded-full border bg-background px-5 h-12 transition-all duration-200 shadow-sm",
            searchFocused 
              ? "border-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]" 
              : "border-border hover:border-primary/50 hover:shadow-md"
          )}
        >
          <Search className={cn("w-5 h-5 shrink-0 transition-colors", searchFocused ? "text-primary" : "text-muted-foreground")} />
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="What would you like to cook?"
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Right: Action buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          {loading ? (
            <AuthActionsSkeleton />
          ) : isAuthenticated ? (
            <>
              <button
                type="button"
                onClick={() => handleNavigate("/post-recipe")}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:scale-105"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Post Recipe
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full hover:bg-secondary/80 transition-all p-1 pr-2.5">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground max-w-[90px] truncate">{displayName}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel className="space-y-0.5">
                    <p className="font-medium text-foreground">{displayName}</p>
                    <p className="text-xs font-normal text-muted-foreground">{email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <UserRound className="mr-2 h-4 w-4" /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-recipes")}>
                    <BookOpen className="mr-2 h-4 w-4" /> My Recipes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <button /*Step 1- login button*/
                type="button"
                onClick={() => navigate("/auth")}
                className="h-9 px-4 text-sm font-medium rounded-full border border-border text-foreground hover:border-primary hover:bg-secondary/50 transition-all"
              >
                Log in
              </button>
              <button /*Step 1- Sign Up button*/
                type="button"
                onClick={() => navigate("/auth?tab=register")}
                className="h-9 px-5 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90 hover:scale-105 transition-all"
              >
                Create account
              </button>
            </>
          )}
        </div>

        {/* Mobile: Logo + Hamburger */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link to="/" className="shrink-0 flex items-center">
            <img src={cookbookLogo} alt="CookBook" className="block h-11 w-auto object-contain dark:hidden" loading="eager" />
            <img src={cookbookLogoDark} alt="CookBook" className="hidden h-11 w-auto object-contain dark:block" loading="eager" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="p-2"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2: Nav links (desktop) ────────────────────────────────── */}
      <div className="hidden md:block ">
        <div className="container mx-auto flex items-center justify-center gap-8 px-4 lg:px-8 h-11">
          {navLinks.map((link) => (
            <button
              key={link.section}
              type="button"
              onClick={() => handleNavigate(link.href)}
              className={cn(
                "relative text-l font-medium transition-colors hover:text-primary py-1",
                isNavItemActive(link.section, link.href)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {link.label}
              {isNavItemActive(link.section, link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-[3px] left-0 right-0 h-[2px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="flex items-center gap-3 rounded-full border border-border bg-secondary/30 px-4 h-11 mb-2">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What would you like to cook?"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
                {searchQuery && (
                  <button type="button" onClick={handleClearSearch}>
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
              </form>

              {navLinks.map((link) => (
                <button
                  key={link.section}
                  type="button"
                  onClick={() => handleNavigate(link.href)}
                  className={cn(
                    "block w-full rounded-2xl px-4 py-3 text-left text-base font-bold transition-colors",
                    isNavItemActive(link.section, link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  {link.label}
                </button>
              ))}

              {loading ? (
                <AuthActionsSkeleton mobile />
              ) : isAuthenticated ? (
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 mt-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                      <p className="text-xs text-muted-foreground truncate">{email}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => handleNavigate("/post-recipe")} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
                    <PlusCircle className="h-4 w-4" /> Post Recipe
                  </button>
                  <button type="button" onClick={() => handleNavigate("/profile")} className="w-full h-10 text-sm font-medium border border-border rounded-full hover:bg-secondary transition-colors">My Profile</button>
                  <button type="button" onClick={() => handleNavigate("/my-recipes")} className="w-full h-10 text-sm font-medium border border-border rounded-full hover:bg-secondary transition-colors">My Recipes</button>
                  <button type="button" onClick={handleLogout} className="w-full h-10 text-sm font-medium border border-border rounded-full hover:bg-secondary transition-colors">Logout</button>
                </div>
              ) : (
                <div className="flex gap-3 pt-2 border-t border-border">
                  <button type="button" onClick={() => handleNavigate("/auth")} className="flex-1 h-10 text-sm font-medium border border-border rounded-full hover:bg-secondary transition-colors">Log in</button>
                  <button type="button" onClick={() => handleNavigate("/auth?tab=register")} className="flex-1 h-10 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-colors">Create account</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;