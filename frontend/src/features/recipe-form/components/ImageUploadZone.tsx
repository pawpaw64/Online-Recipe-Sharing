import { useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploadZoneProps {
  value?: string
  onChange: (url: string) => void
}

export function ImageUploadZone({ value, onChange }: ImageUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload/image`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const json = await res.json()
      if (json.data?.url) onChange(json.data.url)
    } catch {
      // silently fail; user can enter URL manually
    }
  }

  return (
    <div
      className="relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/20 transition-colors hover:border-primary/50"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
      }}
    >
      {value ? (
        <>
          <img src={value} alt="Preview" className="max-h-48 rounded-lg object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 h-7 w-7"
            onClick={(e) => { e.stopPropagation(); onChange('') }}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </>
      ) : (
        <>
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Click or drag &amp; drop to upload</p>
          <p className="text-xs text-muted-foreground">JPEG, PNG, WebP · max 10 MB</p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />
    </div>
  )
}
