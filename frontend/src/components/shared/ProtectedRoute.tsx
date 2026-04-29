import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { PageLoader } from './PageLoader'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/auth" state={{ from: location.pathname }} replace />
  return <>{children}</>
}
