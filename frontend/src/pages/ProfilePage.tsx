import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ProfileForm } from '@/features/profile/components/ProfileForm'
import { useAuth } from '@/providers/AuthProvider'
import { PageLoader } from '@/components/shared/PageLoader'

export default function ProfilePage() {
  const { user, loading } = useAuth()

  if (loading) return <PageLoader />
  if (!user) return null

  return (
    <div className="container max-w-lg py-10">
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatarUrl ?? undefined} />
          <AvatarFallback className="text-2xl">{(user.displayName ?? user.email)[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-display text-2xl font-bold">{user.displayName ?? 'Your Profile'}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Separator className="mb-6" />
      <ProfileForm user={user} />
    </div>
  )
}
