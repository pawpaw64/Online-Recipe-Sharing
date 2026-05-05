import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ImageUploadZone } from '@/features/recipe-form/components/ImageUploadZone'
import { IngredientListBuilder } from '@/features/recipe-form/components/IngredientListBuilder'
import { StepByStepBuilder } from '@/features/recipe-form/components/StepByStepBuilder'
import { VideoTutorialInput } from '@/features/recipe-form/components/VideoTutorialInput'
import { recipeFormSchema, type RecipeFormValues } from '@/features/recipe-form/schemas'
import { useRecipe, useUpdateRecipe } from '@/features/recipes/api'
import { CATEGORIES } from '@/lib/constants'

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: recipe, isLoading } = useRecipe(id!)
  const { mutate, isPending } = useUpdateRecipe(id!)

  const methods = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      difficulty: 'Easy',
      servings: 2,
      calories: 0,
      popular: false,
      ingredients: [{ item: '', position: 0 }],
      instructions: [{ step: '', position: 0 }],
      nutrition: [],
      tags: [],
    },
  })

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = methods

  useEffect(() => {
    if (recipe) {
      reset({
        title: recipe.title,
        description: recipe.description ?? '',
        imageUrl: recipe.imageUrl ?? '',
        prepTime: recipe.prepTime ?? '',
        difficulty: recipe.difficulty as RecipeFormValues['difficulty'],
        category: recipe.category ?? '',
        servings: recipe.servings ?? 2,
        calories: recipe.calories ?? 0,
        youtubeId: recipe.youtubeId ?? '',
        popular: recipe.popular ?? false,
        ingredients: recipe.ingredients?.length
          ? recipe.ingredients.map((i: { item: string; position: number }) => ({ item: i.item, position: i.position }))
          : [{ item: '', position: 0 }],
        instructions: recipe.instructions?.length
          ? recipe.instructions.map((s: { step: string; position: number }) => ({ step: s.step, position: s.position }))
          : [{ step: '', position: 0 }],
        nutrition: recipe.nutrition ?? [],
        tags: recipe.tags?.map((t: { tag: string }) => t.tag) ?? [],
      })
    }
  }, [recipe, reset])

  const onSubmit = (values: RecipeFormValues) => {
    mutate(values, {
      onSuccess: () => navigate(`/recipes/${id}`),
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="mb-8 font-display text-3xl font-bold">Edit Recipe</h1>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" placeholder="Give your recipe a name" {...register('title')} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={3} placeholder="Tell us about your recipe…" {...register('description')} />
          </div>

          <ImageUploadZone
            value={watch('imageUrl') ?? ''}
            onChange={(url) => setValue('imageUrl', url)}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={watch('category') ?? ''} onValueChange={(v) => setValue('category', v)}>
                <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Difficulty</Label>
              <Select value={watch('difficulty')} onValueChange={(v) => setValue('difficulty', v as RecipeFormValues['difficulty'])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prepTime">Prep Time</Label>
              <Input id="prepTime" placeholder="e.g. 30 min" {...register('prepTime')} />
            </div>
          </div>

          <IngredientListBuilder />
          <StepByStepBuilder />
          <VideoTutorialInput />

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" size="lg" className="flex-1" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
