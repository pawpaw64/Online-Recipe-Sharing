import { useEffect, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORIES } from '@/lib/constants'
import { useDebounce } from '@/hooks/useDebounce'

interface Filters {
  search?: string
  category?: string
  difficulty?: string
  sort?: string
}

interface SearchFilterProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

export function SearchFilter({ filters, onChange }: SearchFilterProps) {
  const [search, setSearch] = useState(filters.search ?? '')
  const debouncedSearch = useDebounce(search, 400)

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onChange({ ...filters, search: debouncedSearch || undefined })
    }
  }, [debouncedSearch])

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search recipes..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Select
          value={filters.category ?? 'all'}
          onValueChange={(v) => onChange({ ...filters, category: v === 'all' ? undefined : v })}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.difficulty ?? 'all'}
          onValueChange={(v) => onChange({ ...filters, difficulty: v === 'all' ? undefined : v })}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Difficulty</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.sort ?? 'newest'}
          onValueChange={(v) => onChange({ ...filters, sort: v })}
        >
          <SelectTrigger className="w-[110px]">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
