interface YouTubeEmbedProps {
  youtubeId: string
}

export function YouTubeEmbed({ youtubeId }: YouTubeEmbedProps) {
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="relative aspect-video">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="Recipe video tutorial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
