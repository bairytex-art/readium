'use client'

import { useState } from 'react'
import { useNavigation } from '@/lib/store'
import { useAuthStore } from '@/lib/auth-store'
import { useBlogStore } from '@/lib/blog-store'
import { useSocialStore } from '@/lib/social-store'
import { blogPosts } from '@/lib/mock-data'
import { BookOpen, PenLine, Clock, Heart, Eye, Trash2, FileEdit, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerChild, scaleIn, transitions } from '@/lib/animations'
import { SmartImage } from '@/components/smart-image'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { useHydrated } from '@/hooks/use-hydrated'
import { useToast } from '@/hooks/use-toast'
import { ScrollReveal } from '@/components/scroll-reveal'

type Tab = 'published' | 'drafts'

export function MyStoriesPage() {
  const { openBlog, navigate } = useNavigation()
  const { user, isAuthenticated } = useAuthStore()
  const { getPublishedByAuthor, getDraftsByAuthor, deletePost } = useBlogStore()
  const { getLikeCount, getCommentCount } = useSocialStore()
  const hydrated = useHydrated()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<Tab>('published')

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
            <PenLine className="w-9 h-9 text-muted-foreground/60" />
          </div>
          <h2 className="font-serif-display text-3xl font-bold mb-3">Your stories await</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Log in to see your published stories and drafts, or start writing your first one.
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

  // Get published & draft posts
  const publishedFromStore = getPublishedByAuthor(user.id)
  const draftsFromStore = getDraftsByAuthor(user.id)

  // Also check mock data by author name
  const mockPublished = blogPosts.filter(p => p.author.name === user.name && p.status === 'published')
  const publishedPosts = publishedFromStore.length > 0 ? publishedFromStore : mockPublished
  const drafts = draftsFromStore

  const handleDelete = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    deletePost(postId)
    toast({ title: 'Draft deleted', description: 'Your draft has been permanently removed.' })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <BreadcrumbNav items={[{ label: 'My Stories' }]} />

      {/* Header */}
      <ScrollReveal direction="up">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <PenLine className="w-6 h-6 text-primary" />
              </div>
              <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight">
                My Stories
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Manage your published stories and drafts. {publishedPosts.length} published, {drafts.length} draft{drafts.length !== 1 ? 's' : ''}.
            </p>
          </div>
          <Button onClick={() => navigate('write')} size="lg" className="rounded-xl shrink-0 group btn-magnetic">
            <PenLine className="w-4 h-4 mr-2" />
            New Story
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </ScrollReveal>

      {/* Tabs */}
      <motion.div
        variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
        initial="initial"
        animate="animate"
        transition={{ ...transitions.normal, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex gap-1 p-1 bg-muted/40 rounded-xl border border-border/40 w-fit">
          {[
            { key: 'published' as Tab, label: 'Published', count: publishedPosts.length, icon: <BookOpen className="w-4 h-4" /> },
            { key: 'drafts' as Tab, label: 'Drafts', count: drafts.length, icon: <FileEdit className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-card text-foreground shadow-sm border border-border/50'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${
                activeTab === tab.key
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Posts List */}
      <AnimatePresence mode="wait">
        {activeTab === 'published' ? (
          <motion.div
            key="published"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {publishedPosts.length > 0 ? (
              publishedPosts.map((post) => (
                <motion.div key={post.id} variants={staggerChild} layout>
                  <button
                    onClick={() => openBlog(post.id)}
                    className="group w-full text-left card-lift card-editorial flex gap-5 p-4 sm:p-5 rounded-2xl bg-card border border-border/40 hover:border-primary/15 transition-all"
                  >
                    <div className="relative overflow-hidden rounded-xl w-24 sm:w-36 shrink-0 aspect-[4/3] bg-muted">
                      <SmartImage src={post.coverImage} alt={post.title} className="w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <Badge variant="secondary" className="mb-2 text-xs tag-interactive">{post.category}</Badge>
                      <h3 className="font-serif-display text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-1 mb-3 hidden sm:block">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{getLikeCount(post.id, post.likes)}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.createdAt}</span>
                      </div>
                    </div>
                    <div className="shrink-0 self-center">
                      <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                </motion.div>
              ))
            ) : (
              <EmptyState
                icon={<BookOpen className="w-9 h-9 text-muted-foreground/40" />}
                title="No published stories"
                description="Your published stories will appear here. Start writing and share your experience!"
                actionLabel="Write your first story"
                onAction={() => navigate('write')}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="drafts"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {drafts.length > 0 ? (
              drafts.map((draft) => (
                <motion.div key={draft.id} variants={staggerChild} layout>
                  <button
                    onClick={() => navigate('write')}
                    className="group w-full text-left card-lift card-dark-glow flex gap-5 p-4 sm:p-5 rounded-2xl bg-card border border-dashed border-border/60 hover:border-amber/40 transition-all"
                  >
                    <div className="w-24 sm:w-36 shrink-0 aspect-[4/3] rounded-xl bg-muted/40 flex items-center justify-center">
                      <FileEdit className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <Badge variant="outline" className="mb-2 text-xs border-amber/30 text-amber">Draft</Badge>
                      <h3 className="font-serif-display text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {draft.title || 'Untitled draft'}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-1 mb-3 hidden sm:block">
                        {draft.excerpt || 'No content yet...'}
                      </p>
                      <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        {draft.category && <Badge variant="secondary" className="text-xs py-0 tag-interactive">{draft.category}</Badge>}
                        <span>Updated {draft.updatedAt || draft.createdAt}</span>
                      </div>
                    </div>
                    <div className="shrink-0 self-center flex items-center gap-2">
                      <button
                        onClick={(e) => handleDelete(draft.id, e)}
                        className="p-2.5 rounded-xl text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all"
                        aria-label="Delete draft"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </button>
                </motion.div>
              ))
            ) : (
              <EmptyState
                icon={<FileEdit className="w-9 h-9 text-muted-foreground/40" />}
                title="No drafts"
                description="Start writing and save your progress. Your drafts will appear here."
                actionLabel="Start writing"
                onAction={() => navigate('write')}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: React.ReactNode
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}) {
  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      transition={transitions.normal}
      className="text-center py-16"
    >
      <div className="w-20 h-20 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="font-serif-display text-2xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">{description}</p>
      <Button onClick={onAction} size="lg" className="rounded-xl group">
        {actionLabel}
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  )
}
