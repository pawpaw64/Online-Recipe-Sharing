import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : "light";
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};
