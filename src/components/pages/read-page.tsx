'use client'

import { useState, useMemo } from 'react'
import { useNavigation } from '@/lib/store'
import { blogPosts, categories } from '@/lib/mock-data'
import { Search, Clock, Heart, X, BookOpen, Command, TrendingUp, ArrowUpDown, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer, staggerChild, scaleIn, viewportOnce, transitions } from '@/lib/animations'
import { SmartImage } from '@/components/smart-image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

type SortOption = 'newest' | 'popular' | 'readTime'

export function ReadPage() {
  const { openBlog, openProfile } = useNavigation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  const filteredPosts = useMemo(() => {
    const filtered = blogPosts.filter((post) => {
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort
    switch (sortBy) {
      case 'popular':
        return [...filtered].sort((a, b) => b.likes - a.likes)
      case 'readTime':
        return [...filtered].sort((a, b) => a.readTime - b.readTime)
      case 'newest':
      default:
        return [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  }, [searchQuery, selectedCategory, sortBy])

  // Trending posts (top 5 by likes)
  const trendingPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => b.likes - a.likes).slice(0, 5)
  }, [])

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'newest', label: 'Newest' },
    { key: 'popular', label: 'Most Liked' },
    { key: 'readTime', label: 'Quick Read' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={transitions.normal}
        className="mb-10"
      >
        <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Explore Stories
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
          Discover genuine experiences from writers across the globe. Every story is a window into a different world.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
        <div>
          {/* Search & Filter Bar — Glass effect */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ ...transitions.normal, delay: 0.1 }}
            className="mb-8"
          >
            <div className="glass-subtle border border-border/40 rounded-2xl p-4 sm:p-5 shadow-sm cursor-glow">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search stories, authors, topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-readium pl-12 pr-20 py-3.5"
                    aria-label="Search stories"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 pointer-events-none" title="Opens command palette">
                    <kbd className="kbd">
                      <Command className="w-2.5 h-2.5" />K
                    </kbd>
                  </div>
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 sm:hidden text-muted-foreground hover:text-foreground transition-colors" aria-label="Clear search">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories + Sort */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="flex flex-wrap gap-2 flex-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'badge-category shadow-sm shadow-primary/20'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-sm hover:shadow-muted-foreground/5 tag-interactive'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort options */}
              <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border/30">
                <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium mr-1">Sort:</span>
                {sortOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setSortBy(option.key)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                      sortBy === option.key
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mobile Trending Sheet Trigger */}
          <div className="lg:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl gap-2 text-sm btn-magnetic">
                  <TrendingUp className="w-4 h-4 text-amber" />
                  See Trending
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl max-h-[80vh] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber" />
                    Trending
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-6 space-y-3">
                  {trendingPosts.map((post, index) => (
                    <button
                      key={post.id}
                      onClick={() => openBlog(post.id)}
                      className="w-full text-left group flex gap-3 p-2 -mx-2 rounded-xl hover:bg-muted/40 transition-colors duration-200"
                    >
                      <span className="font-serif-display text-2xl font-bold text-muted-foreground/20 shrink-0 w-7">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                          <span>{post.author.name}</span>
                          <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{post.likes}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick Stats in sheet */}
                <div className="px-4 pb-6 border-t border-border/40 pt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm">Quick Stats</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Total Stories', value: blogPosts.length },
                      { label: 'Categories', value: categories.length - 1 },
                      { label: 'Avg. Read Time', value: `${Math.round(blogPosts.reduce((sum, p) => sum + p.readTime, 0) / blogPosts.length)} min` },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-semibold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Results Count */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ ...transitions.normal, delay: 0.15 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-muted/60 text-muted-foreground text-sm font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'} found
              {selectedCategory !== 'All' && <> in <span className="text-primary font-semibold">{selectedCategory}</span></>}
              {searchQuery && <> matching <span className="text-primary font-semibold">&ldquo;{searchQuery}&rdquo;</span></>}
            </span>
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  variants={staggerChild}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    onClick={() => openBlog(post.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openBlog(post.id) }}
                    className="group card-editorial card-dark-glow w-full text-left bg-card rounded-2xl border border-border/40 hover:border-primary/20 overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <div className="img-overlay aspect-[16/10] bg-muted">
                      <SmartImage src={post.coverImage} alt={post.title} className="w-full h-full" />
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-background/80 text-foreground backdrop-blur-md border border-border/30 px-2.5 py-0.5 text-xs font-semibold shadow-sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif-display text-xl font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => { e.stopPropagation(); openProfile(post.authorId) }}
                          className="flex items-center gap-2.5 hover:text-primary transition-colors"
                          aria-label={`View profile of ${post.author.name}`}
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 ring-2 ring-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            {post.author.avatar}
                          </div>
                          <span className="font-medium text-sm">{post.author.name}</span>
                        </button>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}m</span>
                          <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div variants={scaleIn} initial="initial" animate="animate" transition={transitions.normal} className="text-center py-24">
              <div className="w-20 h-20 rounded-2xl bg-muted/80 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search className="w-9 h-9 text-muted-foreground" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold mb-3">No stories found</h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Try adjusting your search or browse a different category to discover something new.
              </p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('All') }} variant="outline" size="lg" className="rounded-xl">
                Clear filters
              </Button>
            </motion.div>
          )}
        </div>

        {/* Trending Sidebar — Glassmorphism */}
        <aside className="hidden lg:block">
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ ...transitions.normal, delay: 0.2 }}
            className="sticky top-28"
          >
            <div className="glass p-5 rounded-2xl border border-white/10 dark:border-white/5 shadow-sm gradient-border-animated">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-5 h-5 text-amber breathe" />
                <h3 className="font-serif-display text-lg font-bold">Trending</h3>
              </div>
              <div className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <button
                    key={post.id}
                    onClick={() => openBlog(post.id)}
                    className="w-full text-left group flex gap-3 p-2 -mx-2 rounded-xl hover:bg-muted/40 transition-colors duration-200"
                  >
                    <span className="font-serif-display text-2xl font-bold text-muted-foreground/20 shrink-0 w-7">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <span>{post.author.name}</span>
                        <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{post.likes}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats — Glass */}
            <div className="mt-6 glass p-5 rounded-2xl border border-white/10 dark:border-white/5 shadow-sm card-dark-glow">
              <h3 className="font-serif-display text-lg font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                {[
                  { label: 'Total Stories', value: blogPosts.length },
                  { label: 'Categories', value: categories.length - 1 },
                  { label: 'Avg. Read Time', value: `${Math.round(blogPosts.reduce((sum, p) => sum + p.readTime, 0) / blogPosts.length)} min` },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  )
}
