'use client'

import { useNavigation } from '@/lib/store'
import { useAuthStore } from '@/lib/auth-store'
import { useSocialStore } from '@/lib/social-store'
import { useBlogStore } from '@/lib/blog-store'
import { blogPosts } from '@/lib/mock-data'
import { Bookmark, Clock, Heart, BookOpen, ArrowRight, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerChild, scaleIn, transitions } from '@/lib/animations'
import { SmartImage } from '@/components/smart-image'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { useHydrated } from '@/hooks/use-hydrated'
import { useToast } from '@/hooks/use-toast'
import { ScrollReveal } from '@/components/scroll-reveal'

export function BookmarksPage() {
  const { openBlog, navigate } = useNavigation()
  const { user, isAuthenticated } = useAuthStore()
  const { getBookmarkedPostIds, toggleBookmark, isBookmarked, getLikeCount } = useSocialStore()
  const { getPostById } = useBlogStore()
  const hydrated = useHydrated()
  const { toast } = useToast()

  // Not logged in state
  if (hydrated && !isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          transition={transitions.normal}
        >
          <div className="w-20 h-20 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-9 h-9 text-muted-foreground/60" />
          </div>
          <h2 className="font-serif-display text-3xl font-bold mb-3">Save stories for later</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Log in to bookmark your favorite stories and find them all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('login')} size="lg" className="rounded-xl">
              Log in
            </Button>
            <Button onClick={() => navigate('signup')} variant="outline" size="lg" className="rounded-xl">
              Sign up
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!user) return null

  const bookmarkedIds = getBookmarkedPostIds(user.id)
  // Get posts from both blog store and mock data
  const bookmarkedPosts = bookmarkedIds
    .map(id => {
      const storePost = getPostById(id)
      if (storePost) return storePost
      return blogPosts.find(p => p.id === id)
    })
    .filter(Boolean)

  const handleRemoveBookmark = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toggleBookmark(postId, user.id)
    toast({ title: 'Bookmark removed', description: 'Story removed from your bookmarks.' })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <BreadcrumbNav items={[{ label: 'Bookmarks' }]} />

      {/* Header */}
      <ScrollReveal direction="up">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-amber" />
            </div>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight">
              Bookmarks
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Your saved stories, all in one place. {bookmarkedPosts.length > 0 && (
              <span className="text-foreground font-medium">{bookmarkedPosts.length} {bookmarkedPosts.length === 1 ? 'story' : 'stories'}</span>
            )} bookmarked.
          </p>
        </div>
      </ScrollReveal>

      {/* Bookmarked Posts */}
      {bookmarkedPosts.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {bookmarkedPosts.map((post) => {
              if (!post) return null
              return (
                <motion.div
                  key={post.id}
                  layout
                  variants={staggerChild}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <button
                    onClick={() => openBlog(post.id)}
                    className="group w-full text-left card-lift card-editorial flex gap-5 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-card border border-border/40 hover:border-primary/15 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden rounded-xl w-28 sm:w-40 shrink-0 aspect-[4/3] bg-muted">
                      <SmartImage src={post.coverImage} alt={post.title} className="w-full h-full" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 py-0.5">
                      <Badge variant="secondary" className="mb-2 text-xs tag-interactive">{post.category}</Badge>
                      <h3 className="font-serif-display text-lg sm:text-xl font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3 hidden sm:block">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <span className="font-medium text-foreground text-sm">{post.author.name}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{getLikeCount(post.id, post.likes)}</span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <div className="shrink-0 self-center">
                      <button
                        onClick={(e) => handleRemoveBookmark(post.id, e)}
                        className="p-2.5 rounded-xl text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                        aria-label="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          transition={transitions.normal}
          className="text-center py-20"
        >
          <div className="w-20 h-20 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-9 h-9 text-muted-foreground/40" />
          </div>
          <h3 className="font-serif-display text-2xl font-bold mb-3">No bookmarks yet</h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Start exploring stories and save the ones you love. They&apos;ll appear here for easy access.
          </p>
          <Button onClick={() => navigate('read')} size="lg" className="rounded-xl group btn-magnetic">
            <BookOpen className="w-4 h-4 mr-2" />
            Explore Stories
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
