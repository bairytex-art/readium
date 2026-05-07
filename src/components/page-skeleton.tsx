'use client'

import type { Page } from '@/lib/store'

/**
 * Skeleton loading components shown while Zustand stores are hydrating.
 * Each skeleton mimics the layout of its corresponding page with animated shimmer blocks.
 */

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-lg ${className}`} />
}

function SkeletonCircle({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-full ${className}`} />
}

/* ===== Home Page Skeleton ===== */
export function HomeSkeleton() {
  return (
    <div className="flex flex-col" aria-label="Loading home page">
      {/* Hero section */}
      <div className="relative overflow-hidden gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <SkeletonBlock className="h-6 w-32 mb-8" />
            <SkeletonBlock className="h-16 sm:h-20 w-full mb-6" />
            <SkeletonBlock className="h-16 sm:h-20 w-3/4 mb-8" />
            <SkeletonBlock className="h-6 w-full mb-3" />
            <SkeletonBlock className="h-6 w-2/3" />
          </div>
        </div>
      </div>

      {/* Featured section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SkeletonBlock className="h-10 w-48 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SkeletonBlock className="aspect-[16/10] rounded-2xl" />
          <div className="flex flex-col justify-center gap-4">
            <SkeletonBlock className="h-5 w-24" />
            <SkeletonBlock className="h-8 w-full" />
            <SkeletonBlock className="h-8 w-3/4" />
            <SkeletonBlock className="h-5 w-full" />
            <SkeletonBlock className="h-5 w-2/3" />
          </div>
        </div>
      </div>

      {/* Recent stories grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SkeletonBlock className="h-10 w-56 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-border/40 overflow-hidden">
              <SkeletonBlock className="aspect-[16/9]" />
              <div className="p-5 space-y-3">
                <SkeletonBlock className="h-4 w-20" />
                <SkeletonBlock className="h-6 w-full" />
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ===== Read Page Skeleton ===== */
export function ReadSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16" aria-label="Loading read page">
      {/* Title */}
      <SkeletonBlock className="h-12 w-48 mb-8" />

      {/* Search bar */}
      <SkeletonBlock className="h-12 w-full mb-8 rounded-xl" />

      {/* Category pills */}
      <div className="flex gap-2 mb-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonBlock key={i} className="h-9 w-20 rounded-full" />
        ))}
      </div>

      {/* Blog cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border border-border/40 overflow-hidden">
            <SkeletonBlock className="aspect-[16/9]" />
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <SkeletonCircle className="h-6 w-6" />
                <SkeletonBlock className="h-4 w-24" />
              </div>
              <SkeletonBlock className="h-6 w-full" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ===== Blog Detail Skeleton ===== */
export function BlogDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16" aria-label="Loading blog detail">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <SkeletonBlock className="h-4 w-12" />
        <SkeletonBlock className="h-4 w-4" />
        <SkeletonBlock className="h-4 w-20" />
        <SkeletonBlock className="h-4 w-4" />
        <SkeletonBlock className="h-4 w-32" />
      </div>

      {/* Cover image */}
      <SkeletonBlock className="aspect-[2/1] rounded-2xl mb-10" />

      {/* Title area */}
      <div className="space-y-4 mb-10">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-12 w-full" />
        <SkeletonBlock className="h-12 w-3/4" />
        <div className="flex items-center gap-3 pt-4">
          <SkeletonCircle className="h-10 w-10" />
          <div className="space-y-2">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 mb-12">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <SkeletonBlock key={i} className={`h-4 ${i % 3 === 0 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
    </div>
  )
}

/* ===== Profile Skeleton ===== */
export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14" aria-label="Loading profile">
      {/* Back button placeholder */}
      <SkeletonBlock className="h-10 w-20 mb-6 rounded-xl" />

      {/* Profile header */}
      <div className="glass p-8 sm:p-10 mb-10 rounded-2xl border border-white/10 dark:border-white/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <SkeletonCircle className="h-24 w-24" />
          <div className="flex-1 space-y-3">
            <SkeletonBlock className="h-8 w-48" />
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-4 w-full max-w-md" />
            <SkeletonBlock className="h-4 w-3/4 max-w-md" />
          </div>
        </div>
        {/* Stats */}
        <div className="flex items-center gap-8 mt-8 pt-6 border-t border-border/40">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center space-y-2">
              <SkeletonBlock className="h-7 w-12 mx-auto" />
              <SkeletonBlock className="h-3 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Posts heading */}
      <SkeletonBlock className="h-8 w-48 mb-8" />

      {/* Post cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-border/40 overflow-hidden">
            <SkeletonBlock className="aspect-[16/9]" />
            <div className="p-5 space-y-3">
              <SkeletonBlock className="h-4 w-16" />
              <SkeletonBlock className="h-6 w-full" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ===== Generic Skeleton ===== */
export function GenericSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8" aria-label="Loading page">
      <SkeletonBlock className="h-12 w-64" />
      <SkeletonBlock className="h-6 w-full" />
      <SkeletonBlock className="h-6 w-3/4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-border/40 p-6 space-y-4">
            <SkeletonBlock className="aspect-[16/9] rounded-xl" />
            <SkeletonBlock className="h-6 w-3/4" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Returns the appropriate skeleton based on the current page.
 */
export function getPageSkeleton(page: Page) {
  switch (page) {
    case 'home':
      return <HomeSkeleton />
    case 'read':
      return <ReadSkeleton />
    case 'profile':
      return <ProfileSkeleton />
    default:
      return <GenericSkeleton />
  }
}
