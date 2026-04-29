import { Link } from 'react-router-dom'
import { ChefHat, LogIn, LogOut, User } from 'lucide-react'
import { NavLink } from './NavLink'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/providers/AuthProvider'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/community', label: 'Community' },
]

export function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <ChefHat className="h-6 w-6" />
          CookBook
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <>
              <Button asChild size="sm" className="hidden md:inline-flex">
                <Link to="/post-recipe">Share Recipe</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatarUrl ?? undefined} alt={user.displayName ?? 'User'} />
                      <AvatarFallback>{(user.displayName ?? user.email)[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium">{user.displayName ?? user.email}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/my-recipes">My Recipes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">
                <LogIn className="mr-2 h-4 w-4" /> Sign in
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
