// Minimal toast hook — replace with shadcn/ui toast if desired
import { useState, useCallback } from 'react'

interface Toast {
  id: number
  title: string
  description?: string
}

let toastCount = 0

// Simple imperative toast (no UI — add Toaster component for full support)
export function useToast() {
  const [, forceUpdate] = useState(0)

  const toast = useCallback(({ title, description }: { title: string; description?: string }) => {
    const id = ++toastCount
    const t: Toast = { id, title, description }
    // Log to console as fallback; replace with a proper toast lib if desired
    console.info(`[Toast] ${title}${description ? ': ' + description : ''}`)
    forceUpdate((n) => n + 1)
    return t
  }, [])

  return { toast }
}
