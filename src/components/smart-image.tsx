'use client'

import { useState } from 'react'

interface SmartImageProps {
  src: string
  alt: string
  className?: string
}

export function SmartImage({ src, alt, className = '' }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton shimmer while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 skeleton-shimmer rounded-inherit" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-muted-foreground/40 text-sm">Image unavailable</div>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
