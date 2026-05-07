'use client'

import { useNavigation } from '@/lib/store'
import { useAuthStore } from '@/lib/auth-store'
import { useSocialStore } from '@/lib/social-store'
import { useBlogStore } from '@/lib/blog-store'
import { blogPosts } from '@/lib/mock-data'
import { BookOpen, Heart, Users, ArrowLeft, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { staggerContainer, staggerChild, viewportOnce, transitions } from '@/lib/animations'
import { SmartImage } from '@/components/smart-image'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { useHydrated } from '@/hooks/use-hydrated'
import { useToast } from '@/hooks/use-toast'
import { ScrollReveal } from '@/components/scroll-reveal'

export function ProfilePage({ userId }: { userId?: string | null }) {
  const { goBack, openBlog, navigate } = useNavigation()
  const { user: currentUser, isAuthenticated, getUserById } = useAuthStore()
  const { toggleFollow, isFollowing, getFollowerCount, getFollowingCount, getLikeCount } = useSocialStore()
  const { getPublishedByAuthor } = useBlogStore()
  const hydrated = useHydrated()
  const { toast } = useToast()

  // Determine which profile to show
  const profileUser = userId ? getUserById(userId) : currentUser
  const isOwnProfile = !userId || (currentUser && currentUser.id === userId)

  // Get user's posts — check blog store first (user-created), then mock data
  const storePosts = userId ? getPublishedByAuthor(userId) : (currentUser ? getPublishedByAuthor(currentUser.id) : [])
  const authorName = profileUser?.name || ''
  const mockUserPosts = blogPosts.filter(p => p.author.name === authorName)
  const userPosts = storePosts.length > 0 ? storePosts : mockUserPosts

  if (!profileUser) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-6">
          <Users className="w-9 h-9 text-muted-foreground/40" />
        </div>
        <h2 className="text-3xl font-bold mb-4 font-serif-display">User not found</h2>
        <p className="text-muted-foreground text-lg mb-6">This profile may not exist.</p>
        <Button onClick={goBack} variant="default" size="lg" className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go back
        </Button>
      </div>
    )
  }

  const following = isFollowing(currentUser?.id || '', profileUser.id)
  const followerCount = getFollowerCount(profileUser.id)
  const followingCount = getFollowingCount(profileUser.id)
  const totalLikes = userPosts.reduce((sum, p) => sum + getLikeCount(p.id, p.likes), 0)

  const handleFollow = () => {
    if (!currentUser) {
      toast({ title: 'Please log in', description: 'You need to be logged in to follow users.', variant: 'destructive' })
      navigate('login')
      return
    }
    toggleFollow(currentUser.id, profileUser.id)
    toast({
      title: following ? 'Unfollowed' : 'Following!',
      description: following ? `You unfollowed ${profileUser.name}` : `You are now following ${profileUser.name}`,
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { label: 'Profile' },
        ]}
      />

      {/* Back Button */}
      <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} initial="initial" animate="animate" transition={transitions.normal}>
        <Button variant="ghost" onClick={goBack} className="mb-6 text-base group -ml-3 rounded-xl px-4 py-2.5 hover:bg-primary/5">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </Button>
      </motion.div>

      {/* Profile Header — Glassmorphism + Noise */}
      <ScrollReveal direction="up">
        <div className="relative glass card-dark-glow gradient-border-animated p-8 sm:p-10 mb-10 rounded-2xl border border-white/10 dark:border-white/5 overflow-hidden">
          {/* Decorative bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-amber/3 pointer-events-none" />
          <div className="absolute inset-0 noise-overlay pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 ring-4 ring-primary/10 flex items-center justify-center text-2xl sm:text-3xl font-bold text-primary shrink-0">
              {profileUser.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight mb-1">
                {profileUser.name}
              </h1>
              <p className="text-muted-foreground text-base mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Joined {profileUser.createdAt}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mt-3 max-w-lg">
                {profileUser.bio}
              </p>
            </div>

            {/* Actions */}
            {hydrated && !isOwnProfile && (
              <Button
                variant={following ? 'outline' : 'default'}
                size="lg"
                onClick={handleFollow}
                className="rounded-xl shrink-0 btn-magnetic"
              >
                <Users className="w-4 h-4 mr-2" />
                {following ? 'Following' : 'Follow'}
              </Button>
            )}
            {isOwnProfile && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('write')}
                className="rounded-xl shrink-0 btn-magnetic"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Write a Story
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="relative flex items-center gap-8 mt-8 pt-6 border-t border-border/40">
            {[
              { value: userPosts.length, label: 'Stories' },
              { value: followerCount, label: 'Followers' },
              { value: followingCount, label: 'Following' },
              { value: totalLikes, label: 'Total Likes', icon: <Heart className="w-5 h-5 text-amber" /> },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif-display text-2xl font-bold flex items-center gap-1 justify-center">
                  {stat.icon}{stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* User's Posts */}
      <ScrollReveal direction="up" delay={200}>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight mb-8">
          {isOwnProfile ? 'Your Stories' : `Stories by ${profileUser.name}`}
        </h2>

        {userPosts.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {userPosts.map((post) => (
              <motion.div key={post.id} variants={staggerChild}>
                <button
                  onClick={() => openBlog(post.id)}
                  className="group w-full text-left card-lift card-editorial rounded-2xl bg-card border border-border/40 overflow-hidden"
                >
                  <div className="relative overflow-hidden aspect-[16/9] bg-muted">
                    <SmartImage src={post.coverImage} alt={post.title} className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="p-5">
                    <Badge variant="secondary" className="mb-2.5 text-xs">{post.category}</Badge>
                    <h3 className="font-serif-display text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{getLikeCount(post.id, post.likes)}</span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-7 h-7 text-muted-foreground/60" />
            </div>
            <h3 className="font-serif-display text-xl font-bold mb-2">No stories yet</h3>
            <p className="text-muted-foreground mb-6">
              {isOwnProfile ? 'Start writing your first story!' : `${profileUser.name} hasn't published any stories yet.`}
            </p>
            {isOwnProfile && (
              <Button onClick={() => navigate('write')} className="rounded-xl">
                <BookOpen className="w-4 h-4 mr-2" />
                Start Writing
              </Button>
            )}
          </div>
        )}
      </ScrollReveal>
    </div>
  )
}
