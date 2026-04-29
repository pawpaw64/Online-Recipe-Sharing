import { useFieldArray, useFormContext } from 'react-hook-form'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { RecipeFormValues } from '../schemas'

export function IngredientListBuilder() {
  const { register, control, formState: { errors } } = useFormContext<RecipeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: 'ingredients' })

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Ingredients</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ item: '', position: fields.length })}
        >
          <Plus className="mr-1 h-3.5 w-3.5" /> Add
        </Button>
      </div>

      {fields.map((field, i) => (
        <div key={field.id} className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input placeholder={`Ingredient ${i + 1}`} {...register(`ingredients.${i}.item`)} />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 text-destructive"
            onClick={() => remove(i)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {(errors.ingredients as unknown as { message?: string })?.message && (
        <p className="text-xs text-destructive">{(errors.ingredients as unknown as { message?: string }).message}</p>
      )}
    </div>
  )
}
