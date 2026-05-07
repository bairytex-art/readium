'use client'

import { useNavigation } from '@/lib/store'
import { useAuthStore } from '@/lib/auth-store'
import { useSocialStore } from '@/lib/social-store'
import { useBlogStore } from '@/lib/blog-store'
import { blogPosts } from '@/lib/mock-data'
import { ArrowLeft, Clock, Heart, Share2, Bookmark, MessageCircle, MoreHorizontal, BookOpen, User, BookMarked } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import { fadeUp, fadeLeft, staggerContainer, staggerChild, viewportOnce, transitions } from '@/lib/animations'
import { ReadingProgress } from '@/components/reading-progress'
import { SmartImage } from '@/components/smart-image'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { ShareDialog } from '@/components/share-dialog'
import { ReadingSettings } from '@/components/reading-settings'
import { TableOfContents } from '@/components/table-of-contents'
import { StoryCelebration } from '@/components/story-celebration'
import { useHydrated } from '@/hooks/use-hydrated'
import { useToast } from '@/hooks/use-toast'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function BlogDetail({ blogId }: { blogId: string }) {
  const { goBack, openBlog, openProfile, navigate } = useNavigation()
  const { user, isAuthenticated } = useAuthStore()
  const { toggleLike, isLiked, getLikeCount, toggleBookmark, isBookmarked, addComment, getCommentsByPost, toggleFollow, isFollowing } = useSocialStore()
  const { getPostById } = useBlogStore()
  const hydrated = useHydrated()
  const { toast } = useToast()
  const [likeAnim, setLikeAnim] = useState(false)
  const [bookmarkAnim, setBookmarkAnim] = useState(false)
  const [comment, setComment] = useState('')
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [doubleTapLike, setDoubleTapLike] = useState(false)
  const [doubleTapPos, setDoubleTapPos] = useState({ x: 0, y: 0 })
  const [doubleTapTarget, setDoubleTapTarget] = useState<'cover' | 'content'>('cover')

  // Find post from blog store or mock data
  const post = useMemo(() => {
    const storePost = getPostById(blogId)
    if (storePost) return storePost
    return blogPosts.find((p) => p.id === blogId)
  }, [blogId, getPostById])

  // Social state
  const userId = user?.id || ''
  const liked = hydrated && isAuthenticated ? isLiked(blogId, userId) : false
  const bookmarked = hydrated && isAuthenticated ? isBookmarked(blogId, userId) : false
  const currentLikeCount = getLikeCount(blogId, post?.likes || 0)
  const comments = getCommentsByPost(blogId)
  const following = hydrated && isAuthenticated && post ? isFollowing(userId, post.authorId) : false

  const handleLike = () => {
    if (!hydrated || !isAuthenticated) {
      toast({ title: 'Please log in', description: 'You need to be logged in to like stories.', variant: 'destructive' })
      return
    }
    toggleLike(blogId, userId)
    setLikeAnim(true)
    setTimeout(() => setLikeAnim(false), 400)
    toast({
      title: isLiked(blogId, userId) ? 'Removed like' : 'Liked!',
      description: isLiked(blogId, userId) ? 'Like removed from this story.' : 'This story has been added to your liked posts.',
    })
  }

  const handleBookmark = () => {
    if (!hydrated || !isAuthenticated) {
      toast({ title: 'Please log in', description: 'You need to be logged in to bookmark stories.', variant: 'destructive' })
      return
    }
    toggleBookmark(blogId, userId)
    setBookmarkAnim(true)
    setTimeout(() => setBookmarkAnim(false), 400)
    toast({
      title: isBookmarked(blogId, userId) ? 'Bookmark removed' : 'Bookmarked!',
      description: isBookmarked(blogId, userId) ? 'Story removed from bookmarks.' : 'This story has been saved to your bookmarks.',
    })
  }

  const handleShare = () => {
    setShareDialogOpen(true)
  }

  const handleComment = () => {
    if (!hydrated || !isAuthenticated) {
      toast({ title: 'Please log in', description: 'You need to be logged in to comment.', variant: 'destructive' })
      return
    }
    if (!comment.trim()) return
    addComment(blogId, userId, user.name, user.avatar, comment)
    toast({ title: 'Comment posted!', description: 'Your comment has been published.' })
    setComment('')
  }

  const handleFollow = () => {
    if (!hydrated || !isAuthenticated || !post) return
    toggleFollow(userId, post.authorId)
    toast({
      title: isFollowing(userId, post.authorId) ? 'Unfollowed' : 'Following!',
      description: isFollowing(userId, post.authorId) ? `You unfollowed ${post.author.name}` : `You are now following ${post.author.name}`,
    })
  }

  const handleDoubleTapLike = useCallback((e: React.MouseEvent<HTMLDivElement>, target: 'cover' | 'content') => {
    if (!hydrated || !isAuthenticated) return
    // If already liked, don't unlike on double-tap (Instagram behavior)
    if (liked) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setDoubleTapPos({ x, y })
    setDoubleTapTarget(target)
    setDoubleTapLike(true)

    // Trigger the actual like
    toggleLike(blogId, userId)
    setLikeAnim(true)
    setTimeout(() => setLikeAnim(false), 400)
    toast({
      title: 'Liked!',
      description: 'This story has been added to your liked posts.',
    })

    // Remove the heart animation after 800ms
    setTimeout(() => setDoubleTapLike(false), 800)
  }, [hydrated, isAuthenticated, liked, blogId, userId, toggleLike, toast])

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-9 h-9 text-muted-foreground/40" />
        </div>
        <h2 className="text-3xl font-bold mb-4 font-serif-display">Story not found</h2>
        <p className="text-muted-foreground text-lg mb-6">This story may have been removed or doesn&apos;t exist.</p>
        <Button onClick={goBack} variant="default" size="lg" className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go back
        </Button>
      </div>
    )
  }

  // Related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  // More from author
  const moreFromAuthor = blogPosts
    .filter((p) => p.author.name === post.author.name && p.id !== post.id)
    .slice(0, 2)

  return (
    <>
      <ReadingProgress readTime={post.readTime} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav
          items={[
            { label: 'Stories', onClick: () => navigate('read') },
            { label: post.category, onClick: () => navigate('read') },
            { label: post.title },
          ]}
        />

        {/* Back Button */}
        <motion.div variants={fadeLeft} initial="initial" animate="animate" transition={transitions.normal}>
          <Button variant="ghost" onClick={goBack} className="mb-6 text-base group -ml-3 rounded-xl px-4 py-2.5 hover:bg-primary/5">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to stories
          </Button>
        </motion.div>

        {/* Mobile Table of Contents */}
        <TableOfContents />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
          {/* Main Content */}
          <motion.article variants={fadeUp} initial="initial" animate="animate" transition={transitions.normal} className="ambient-reading">
            {/* Article Header */}
            <header className="mb-10">
              <span className="badge-category mb-5 inline-block">{post.category}</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight mb-6 font-serif-display">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 pl-5 border-l-3 border-amber">
                {post.excerpt}
              </p>

              {/* Author & Meta */}
              <div className="flex items-center gap-4 pb-7 border-b border-border/50">
                <button
                  onClick={() => openProfile(post.authorId)}
                  className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary ring-2 ring-primary/10 shrink-0 hover:ring-primary/30 transition-all"
                  aria-label={`View profile of ${post.author.name}`}
                >
                  {post.author.avatar}
                </button>
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => openProfile(post.authorId)}
                    className="font-semibold text-base hover:text-primary transition-colors animated-underline"
                  >
                    {post.author.name}
                  </button>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm mt-0.5">
                    <span>{post.createdAt}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span className="reading-indicator">
                      <Clock className="w-3.5 h-3.5" />{post.readTime} min read
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 dark:hover:bg-red-950/20" onClick={handleLike} aria-label={liked ? 'Remove like' : 'Like this story'}>
                    <div className={likeAnim ? 'heart-burst' : ''}>
                      <Heart className={`w-5 h-5 transition-colors ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                    </div>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-amber/10 dark:hover:bg-amber/15" onClick={handleBookmark} aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this story'}>
                    <div className={bookmarkAnim ? 'bookmark-bounce' : ''}>
                      <Bookmark className={`w-5 h-5 transition-colors ${bookmarked ? 'fill-amber text-amber' : ''}`} />
                    </div>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5" onClick={handleShare} aria-label="Share this story">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5" aria-label="More options">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Mobile Author & Related Sheet Triggers */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-xl gap-2 text-sm">
                    <User className="w-4 h-4 text-primary" />
                    About Author
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl max-h-[80vh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      About the Author
                    </SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pb-6">
                    <button onClick={() => openProfile(post.authorId)} className="flex items-center gap-3 mb-4 w-full text-left group">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-base font-bold text-primary ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                        {post.author.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-lg group-hover:text-primary transition-colors">{post.author.name}</div>
                        <div className="text-muted-foreground text-sm">Writer</div>
                      </div>
                    </button>
                    <p className="text-muted-foreground text-base leading-relaxed mb-5">{post.author.bio}</p>
                    <Button
                      variant={following ? 'outline' : 'sage'}
                      size="md"
                      className="w-full rounded-xl"
                      onClick={handleFollow}
                    >
                      {following ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-xl gap-2 text-sm">
                    <BookMarked className="w-4 h-4 text-amber" />
                    Related Stories
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl max-h-[80vh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <BookMarked className="w-5 h-5 text-amber" />
                      Related Stories
                    </SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pb-6 space-y-6">
                    {/* More from Author */}
                    {moreFromAuthor.length > 0 && (
                      <div>
                        <h4 className="font-bold text-base mb-4 font-serif-display">More from {post.author.name}</h4>
                        <div className="space-y-3">
                          {moreFromAuthor.map((p) => (
                            <button key={p.id} onClick={() => openBlog(p.id)} className="w-full text-left group p-3 -mx-3 rounded-xl hover:bg-muted/40 transition-colors duration-200">
                              <h5 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1 animated-underline">{p.title}</h5>
                              <span className="text-muted-foreground text-sm flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime} min read</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related in Category */}
                    {relatedPosts.length > 0 && (
                      <div className="border-t border-border/40 pt-4">
                        <h4 className="font-bold text-base mb-4 font-serif-display">Related in {post.category}</h4>
                        <div className="space-y-3">
                          {relatedPosts.map((p) => (
                            <button key={p.id} onClick={() => openBlog(p.id)} className="w-full text-left group flex gap-3 p-2 -mx-2 rounded-xl hover:bg-muted/40 transition-colors duration-200 card-editorial">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0 ring-1 ring-black/5">
                                <SmartImage src={p.coverImage} alt={p.title} className="w-16 h-16" />
                              </div>
                              <div className="min-w-0">
                                <h5 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-0.5 animated-underline">{p.title}</h5>
                                <span className="text-muted-foreground text-xs">{p.author.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Cover Image — double-tap to like */}
            <motion.div
              className="relative overflow-hidden rounded-2xl mb-12 bg-muted ring-1 ring-black/5 card-editorial gradient-border-animated"
              variants={fadeUp} initial="initial" animate="animate" transition={transitions.slow} viewport={viewportOnce}
              onDoubleClick={(e) => handleDoubleTapLike(e, 'cover')}
            >
              <SmartImage src={post.coverImage} alt={post.title} className="aspect-[16/9]" />
              {/* Double-tap heart animation */}
              <AnimatePresence>
                {doubleTapLike && doubleTapTarget === 'cover' && (
                  <motion.div
                    className="absolute pointer-events-none z-20"
                    style={{ left: doubleTapPos.x - 40, top: doubleTapPos.y - 40 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <Heart className="w-20 h-20 text-white fill-white drop-shadow-lg" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Article Content — with drop cap, double-tap to like */}
            <div
              className="relative"
              onDoubleClick={(e) => handleDoubleTapLike(e, 'content')}
            >
              <div
                className="prose-readium max-w-2xl drop-cap"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {/* Double-tap heart animation */}
              <AnimatePresence>
                {doubleTapLike && doubleTapTarget === 'content' && (
                  <motion.div
                    className="absolute pointer-events-none z-20"
                    style={{ left: doubleTapPos.x - 40, top: doubleTapPos.y - 40 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <Heart className="w-20 h-20 text-white fill-white drop-shadow-lg" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag-interactive px-3.5 py-1.5 text-sm rounded-full border border-border/60 bg-muted/30 text-muted-foreground transition-all duration-200 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Action Bar */}
            <div className="sm:hidden flex items-center justify-around py-5 mt-8 border-y border-border/50">
              <button onClick={handleLike} className="flex items-center gap-2 text-muted-foreground hover:text-foreground rounded-full px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors btn-magnetic" aria-label={liked ? 'Remove like' : 'Like this story'}>
                <div className={likeAnim ? 'heart-burst' : ''}>
                  <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                </div>
                <span className="text-sm">{currentLikeCount}</span>
              </button>
              <button onClick={handleBookmark} className="text-muted-foreground hover:text-foreground rounded-full p-2 hover:bg-amber/10 dark:hover:bg-amber/15 transition-colors btn-magnetic" aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this story'}>
                <div className={bookmarkAnim ? 'bookmark-bounce' : ''}>
                  <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-amber text-amber' : ''}`} />
                </div>
              </button>
              <button onClick={handleShare} className="text-muted-foreground hover:text-foreground rounded-full p-2 hover:bg-primary/5 transition-colors btn-magnetic" aria-label="Share this story">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-8 font-serif-display">
                <MessageCircle className="w-6 h-6 inline mr-2 -mt-1" />
                Comments
                {comments.length > 0 && <span className="text-muted-foreground text-lg font-normal ml-2">({comments.length})</span>}
              </h3>

              {/* Comment Input */}
              <div className="mb-10">
                <textarea
                  placeholder={isAuthenticated ? "Share your thoughts on this story..." : "Log in to leave a comment..."}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="input-readium resize-none min-h-[120px]"
                  disabled={!isAuthenticated}
                  aria-label="Write a comment"
                />
                <div className="flex justify-end mt-3">
                  <Button variant="default" size="md" className="rounded-xl" onClick={handleComment} disabled={!isAuthenticated || !comment.trim()}>
                    Post Comment
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <motion.div className="space-y-5" variants={staggerContainer} initial="initial" animate="animate">
                {comments.length > 0 ? comments.map((c) => (
                  <motion.div
                    key={c.id}
                    variants={staggerChild}
                    className="flex gap-4 p-5 rounded-xl bg-muted/20 border border-border/30 border-l-3 border-l-amber/60 comment-enter"
                  >
                    <button onClick={() => openProfile(c.authorId)} className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-xs font-bold text-sage shrink-0 ring-2 ring-sage/10 hover:ring-sage/30 transition-all" aria-label={`View profile of ${c.authorName}`}>
                      {c.authorAvatar}
                    </button>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <button onClick={() => openProfile(c.authorId)} className="font-semibold text-base hover:text-primary transition-colors animated-underline">
                          {c.authorName}
                        </button>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                        <span className="text-muted-foreground text-sm">{c.createdAt}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{c.content}</p>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-10">
                    <MessageCircle className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
                    <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-10">
              {/* Table of Contents */}
              <TableOfContents />

              {/* Author Card — Glassmorphism */}
              <motion.div
                className="glass p-6 rounded-2xl border border-white/10 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 card-dark-glow"
                variants={fadeUp} initial="initial" whileInView="animate" transition={transitions.normal} viewport={viewportOnce}
              >
                <button onClick={() => openProfile(post.authorId)} className="flex items-center gap-3 mb-4 w-full text-left group">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-base font-bold text-primary ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                    {post.author.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-lg group-hover:text-primary transition-colors">{post.author.name}</div>
                    <div className="text-muted-foreground text-sm">Writer</div>
                  </div>
                </button>
                <p className="text-muted-foreground text-base leading-relaxed mb-5">{post.author.bio}</p>
                <Button
                  variant={following ? 'outline' : 'sage'}
                  size="md"
                  className="w-full rounded-xl btn-magnetic"
                  onClick={handleFollow}
                >
                  {following ? 'Following' : 'Follow'}
                </Button>
              </motion.div>

              {/* More from Author */}
              {moreFromAuthor.length > 0 && (
                <motion.div variants={fadeUp} initial="initial" whileInView="animate" transition={transitions.normal} viewport={viewportOnce}>
                  <h4 className="font-bold text-base mb-5 font-serif-display">More from {post.author.name}</h4>
                  <div className="space-y-4">
                    {moreFromAuthor.map((p) => (
                      <button key={p.id} onClick={() => openBlog(p.id)} className="w-full text-left group p-3 -mx-3 rounded-xl hover:bg-muted/40 transition-colors duration-200">
                        <h5 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1 animated-underline">{p.title}</h5>
                        <span className="text-muted-foreground text-sm flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime} min read</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Related Stories */}
              {relatedPosts.length > 0 && (
                <motion.div variants={fadeUp} initial="initial" whileInView="animate" transition={transitions.normal} viewport={viewportOnce}>
                  <h4 className="font-bold text-base mb-5 font-serif-display">Related in {post.category}</h4>
                  <div className="space-y-4">
                    {relatedPosts.map((p) => (
                      <button key={p.id} onClick={() => openBlog(p.id)} className="w-full text-left group flex gap-3 p-2 -mx-2 rounded-xl hover:bg-muted/40 transition-colors duration-200 card-editorial">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0 ring-1 ring-black/5">
                          <SmartImage src={p.coverImage} alt={p.title} className="w-16 h-16" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-0.5 animated-underline">{p.title}</h5>
                          <span className="text-muted-foreground text-xs">{p.author.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Share Dialog */}
      {post && (
        <ShareDialog
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          title={post.title}
        />
      )}

      {/* Reading Settings — floating button + panel */}
      <ReadingSettings />

      {/* Story Completion Celebration */}
      <StoryCelebration
        readTime={post.readTime}
        relatedPosts={relatedPosts}
        onReadNext={(id) => openBlog(id)}
      />
    </>
  )
}
