import type { Instruction } from '@/features/recipes/types'

interface StepsListProps {
  instructions: Instruction[]
}

export function StepsList({ instructions }: StepsListProps) {
  return (
    <div>
      <h3 className="mb-4 font-display text-lg font-semibold">Instructions</h3>
      <ol className="space-y-4">
        {instructions
          .slice()
          .sort((a, b) => a.position - b.position)
          .map((ins, i) => (
            <li key={ins.id} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed">{ins.step}</p>
            </li>
          ))}
      </ol>
    </div>
  )
}
