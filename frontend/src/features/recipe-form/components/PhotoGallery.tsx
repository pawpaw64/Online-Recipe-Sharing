import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { RecipeFormValues } from '../schemas'

export function PhotoGallery() {
  const { register, formState: { errors } } = useFormContext<RecipeFormValues>()

  return (
    <div className="space-y-1.5">
      <Label htmlFor="imageUrl">Cover Image URL</Label>
      <Input id="imageUrl" placeholder="https://…" {...register('imageUrl')} />
      {errors.imageUrl && <p className="text-xs text-destructive">{errors.imageUrl.message}</p>}
    </div>
  )
}
