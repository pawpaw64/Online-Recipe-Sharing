import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-card">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm font-medium text-foreground">Checking your session</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;