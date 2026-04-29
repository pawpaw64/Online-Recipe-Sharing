import { useFieldArray, useFormContext } from 'react-hook-form'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { RecipeFormValues } from '../schemas'

export function StepByStepBuilder() {
  const { register, control, formState: { errors } } = useFormContext<RecipeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: 'instructions' })

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Steps</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ step: '', position: fields.length })}
        >
          <Plus className="mr-1 h-3.5 w-3.5" /> Add Step
        </Button>
      </div>

      {fields.map((field, i) => (
        <div key={field.id} className="flex items-start gap-2">
          <GripVertical className="mt-2.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {i + 1}
          </span>
          <Textarea
            placeholder={`Step ${i + 1}…`}
            rows={2}
            className="flex-1"
            {...register(`instructions.${i}.step`)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mt-1 h-9 w-9 shrink-0 text-destructive"
            onClick={() => remove(i)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {(errors.instructions as unknown as { message?: string })?.message && (
        <p className="text-xs text-destructive">{(errors.instructions as unknown as { message?: string }).message}</p>
      )}
    </div>
  )
}
