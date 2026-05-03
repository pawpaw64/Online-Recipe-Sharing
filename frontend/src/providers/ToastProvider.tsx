import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  toast: (opts: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let counter = 0;

const ICONS: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />,
  error: <AlertCircle className="w-4 h-4 text-destructive shrink-0" />,
  info: <Info className="w-4 h-4 text-primary shrink-0" />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "info" }: Omit<ToastItem, "id">) => {
      const id = ++counter;
      setToasts((prev) => [...prev.slice(-4), { id, title, description, variant }]);
      const timer = setTimeout(() => dismiss(id), 3500);
      timers.current.set(id, timer);
    },
    [dismiss]
  );

  // Cleanup on unmount
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toaster portal */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none w-80">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-2xl border bg-card/95 backdrop-blur-sm px-4 py-3 shadow-lg",
                t.variant === "error" && "border-destructive/30",
                t.variant === "success" && "border-emerald-500/30",
                t.variant === "info" && "border-primary/20"
              )}
            >
              {ICONS[t.variant ?? "info"]}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-snug">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-0.5"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
