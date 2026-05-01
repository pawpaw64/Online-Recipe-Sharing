import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { COMMUNITY_GROUPS } from '@/features/community/data'

export default function CommunityPage() {
  const [search, setSearch] = useState('')
  const filtered = search.trim()
    ? COMMUNITY_GROUPS.filter((group) =>
        `${group.name} ${group.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()),
      )
    : COMMUNITY_GROUPS

  return (
    <div className="container py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-bold text-primary">Community Groups</h1>
        <p className="mt-2 text-muted-foreground">
          Join a group, ask questions, share doubts, and swap cooking ideas.
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mb-10 max-w-md">
        <div className="relative">
          <MessageSquare className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search groups or tags…"
            className="w-full rounded-full border-0 bg-background py-3 pl-11 pr-4 text-sm shadow-card focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">No groups found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((group, i) => (
            <motion.div
              key={group.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="flex flex-col overflow-hidden rounded-card border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-foreground">{group.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {group.posts} posts
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {group.members.toLocaleString()} members
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" /> Active today
                </span>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <Button asChild className="w-full gap-2">
                  <Link to={`/community/${group.slug}`}>
                    Open Group <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
