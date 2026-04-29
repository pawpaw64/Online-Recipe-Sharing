import { useState } from 'react'
import { Loader2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useCreateComment } from '@/features/comments/api'
import { useAuth } from '@/providers/AuthProvider'

interface CommentFormProps {
  recipeId: string
}

export function CommentForm({ recipeId }: CommentFormProps) {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const { mutate, isPending } = useCreateComment(recipeId)

  if (!user) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    mutate({ content, rating: rating || undefined }, {
      onSuccess: () => {
        setContent('')
        setRating(0)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setRating(v === rating ? 0 : v)}
            className="focus-visible:outline-none"
          >
            <Star
              className={`h-5 w-5 transition-colors ${v <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
            />
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Share your thoughts…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      <Button type="submit" size="sm" disabled={isPending || !content.trim()}>
        {isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
        Post Comment
      </Button>
    </form>
  )
}
