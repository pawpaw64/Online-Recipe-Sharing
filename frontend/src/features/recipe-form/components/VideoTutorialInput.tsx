import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { RecipeFormValues } from '../schemas'

export function VideoTutorialInput() {
  const { register, formState: { errors } } = useFormContext<RecipeFormValues>()

  return (
    <div className="space-y-1.5">
      <Label htmlFor="youtubeId">YouTube Video ID (optional)</Label>
      <Input
        id="youtubeId"
        placeholder="e.g. dQw4w9WgXcQ"
        {...register('youtubeId')}
      />
      {errors.youtubeId && (
        <p className="text-xs text-destructive">{errors.youtubeId.message}</p>
      )}
      <p className="text-xs text-muted-foreground">
        Paste only the video ID from the YouTube URL (after ?v=).
      </p>
    </div>
  )
}
