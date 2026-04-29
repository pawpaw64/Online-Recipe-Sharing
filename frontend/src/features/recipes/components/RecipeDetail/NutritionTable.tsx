import type { NutritionItem } from '@/features/recipes/types'

interface NutritionTableProps {
  nutrition: NutritionItem[]
}

export function NutritionTable({ nutrition }: NutritionTableProps) {
  if (!nutrition.length) return null

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="mb-4 font-display text-lg font-semibold">Nutrition Facts</h3>
      <table className="w-full text-sm">
        <tbody>
          {nutrition.map((n) => (
            <tr key={n.id} className="border-b last:border-0">
              <td className="py-1.5 text-muted-foreground">{n.label}</td>
              <td className="py-1.5 text-right font-medium">{n.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
