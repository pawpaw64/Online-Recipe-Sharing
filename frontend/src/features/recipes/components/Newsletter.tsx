import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/useToast'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({ title: 'Subscribed!', description: 'You\'ll receive our weekly recipe digest.' })
    setEmail('')
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-display text-2xl font-bold">Weekly Recipes in Your Inbox</h2>
          <p className="mt-2 text-muted-foreground">
            Subscribe to get the best recipes delivered every week.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
