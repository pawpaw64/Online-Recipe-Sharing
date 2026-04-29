import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useUpdateProfile } from '@/features/profile/api'
import type { AuthUser } from '@/features/auth/types'

const profileSchema = z.object({
  displayName: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().max(500).optional().or(z.literal('')),
})

type ProfileValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
  user: AuthUser
  onSuccess?: () => void
}

export function ProfileForm({ user, onSuccess }: ProfileFormProps) {
  const { mutate, isPending } = useUpdateProfile()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user.displayName ?? '',
      bio: user.bio ?? '',
      avatarUrl: user.avatarUrl ?? '',
    },
  })

  const onSubmit = (values: ProfileValues) => {
    mutate(values, { onSuccess })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="displayName">Display Name</Label>
        <Input id="displayName" {...register('displayName')} />
        {errors.displayName && <p className="text-xs text-destructive">{errors.displayName.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" rows={3} {...register('bio')} />
        {errors.bio && <p className="text-xs text-destructive">{errors.bio.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="avatarUrl">Avatar URL</Label>
        <Input id="avatarUrl" placeholder="https://…" {...register('avatarUrl')} />
        {errors.avatarUrl && <p className="text-xs text-destructive">{errors.avatarUrl.message}</p>}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  )
}
