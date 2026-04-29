import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRecipes } from '@/features/recipes/api'

export function CreatorsSection() {
  // Use most recent recipes to infer authors
  const { data } = useRecipes({ limit: 12, sort: 'newest' })
  const recipes = data?.data ?? []

  const authorMap = new Map<string, { name: string; avatar: string | null; id: string | null }>()
  for (const r of recipes) {
    if (r.authorId && !authorMap.has(r.authorId)) {
      authorMap.set(r.authorId, { name: r.authorName, avatar: r.authorAvatar, id: r.authorId })
    }
    if (authorMap.size >= 6) break
  }

  const creators = Array.from(authorMap.values())

  if (!creators.length) return null

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="mb-8 text-center font-display text-2xl font-bold sm:text-3xl">
          Meet Our Creators
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {creators.map((c) => (
            <Link
              key={c.id}
              to={c.id ? `/community?author=${c.id}` : '#'}
              className="flex flex-col items-center gap-2 text-center hover:opacity-80"
            >
              <Avatar className="h-16 w-16">
                <AvatarImage src={c.avatar ?? undefined} alt={c.name} />
                <AvatarFallback>{c.name[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
