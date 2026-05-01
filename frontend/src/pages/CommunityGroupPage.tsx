import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MessageSquare, ThumbsUp, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { COMMUNITY_GROUPS, COMMUNITY_POSTS, type CommunityPost, type CommunityPostType } from '@/features/community/data'

const typeLabel: Record<CommunityPostType, string> = {
  question: 'Question',
  doubt: 'Doubt',
  share: 'Share',
}

const typeClass: Record<CommunityPostType, string> = {
  question: 'bg-primary/10 text-primary border-primary/20',
  doubt: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
  share: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
}

export default function CommunityGroupPage() {
  const { slug } = useParams()
  const group = useMemo(() => COMMUNITY_GROUPS.find((g) => g.slug === slug), [slug])
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [postType, setPostType] = useState<CommunityPostType>('question')

  useEffect(() => {
    if (!slug) return
    setPosts(COMMUNITY_POSTS[slug] ?? [])
  }, [slug])

  if (!group) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-primary">Community not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The group you are looking for does not exist yet.
        </p>
        <Button asChild className="mt-6">
          <Link to="/community">Back to Community</Link>
        </Button>
      </div>
    )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim() || !body.trim()) return

    const newPost: CommunityPost = {
      id: `local-${Date.now()}`,
      author: 'You',
      title: title.trim(),
      body: body.trim(),
      type: postType,
      createdAt: 'Just now',
      replies: 0,
      likes: 0,
    }

    setPosts((current) => [newPost, ...current])
    setTitle('')
    setBody('')
    setPostType('question')
  }

  return (
    <div className="container py-16">
      <div className="rounded-card bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 shadow-card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Community Group</p>
            <h1 className="font-display text-4xl font-bold text-foreground">{group.name}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{group.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" /> {group.members.toLocaleString()} members
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" /> {posts.length} posts
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-semibold text-foreground">Latest Posts</h2>
          {posts.length === 0 ? (
            <div className="rounded-card border border-dashed p-8 text-center text-sm text-muted-foreground">
              No posts yet. Start the first conversation!
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="rounded-card bg-secondary/25 p-5 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">{post.title}</h3>
                  <Badge className={`border ${typeClass[post.type]}`}>{typeLabel[post.type]}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{post.body}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span>Posted by {post.author} · {post.createdAt}</span>
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" /> {post.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5" /> {post.likes} likes
                    </span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="rounded-card bg-secondary/20 p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Create a Post</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Ask a question, share a doubt, or post anything helpful for the group.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/community">Back to Community</Link>
            </Button>
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Post type</label>
              <Select value={postType} onValueChange={(value) => setPostType(value as CommunityPostType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="doubt">Doubt</SelectItem>
                  <SelectItem value="share">Share</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title</label>
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Give your post a short title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Details</label>
              <Textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="Share the full question, doubt, or tip"
                rows={5}
              />
            </div>

            <Button type="submit" className="w-full">
              Post to {group.name}
            </Button>
            <p className="text-xs text-muted-foreground">
              Posts are stored in-memory for now. Reloading will reset the list.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
