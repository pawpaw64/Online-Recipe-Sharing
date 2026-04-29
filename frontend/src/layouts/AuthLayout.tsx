import { Outlet } from 'react-router-dom'
import { ChefHat } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <Link to="/" className="mb-8 flex items-center gap-2 font-display text-2xl font-bold text-primary">
        <ChefHat className="h-7 w-7" />
        CookBook
      </Link>
      <Outlet />
    </div>
  )
}
