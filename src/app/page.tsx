'use client'

import { useNavigation } from '@/lib/store'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HomePage } from '@/components/pages/home-page'
import { ReadPage } from '@/components/pages/read-page'
import { BlogDetail } from '@/components/pages/blog-detail'
import { WritePage } from '@/components/pages/write-page'
import { OurStoryPage } from '@/components/pages/our-story-page'
import { SignupPage } from '@/components/pages/signup-page'
import { LoginPage } from '@/components/pages/login-page'
import { ProfilePage } from '@/components/pages/profile-page'
import { BookmarksPage } from '@/components/pages/bookmarks-page'
import { MyStoriesPage } from '@/components/pages/my-stories-page'
import { NotFoundPage } from '@/components/pages/not-found-page'
import { ScrollToTop } from '@/components/scroll-to-top'
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts'
import { CommandPalette } from '@/components/command-palette'
import { MobileNav } from '@/components/mobile-nav'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '@/lib/animations'
import { useHydrated } from '@/hooks/use-hydrated'
import { getPageSkeleton } from '@/components/page-skeleton'
import { useBlogStore } from '@/lib/blog-store'
import { blogPosts } from '@/lib/mock-data'

export default function Home() {
  const { currentPage, selectedBlogId, profileUserId } = useNavigation()
  const hydrated = useHydrated()
  const { getPostById } = useBlogStore()

  const pageKey = selectedBlogId || currentPage

  const renderPage = () => {
    // If a blog is selected, show blog detail or 404 if not found
    if (selectedBlogId) {
      const storePost = getPostById(selectedBlogId)
      const mockPost = blogPosts.find(p => p.id === selectedBlogId)
      if (!storePost && !mockPost) {
        return <NotFoundPage />
      }
      return <BlogDetail blogId={selectedBlogId} />
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'read':
        return <ReadPage />
      case 'write':
        return <WritePage />
      case 'our-story':
        return <OurStoryPage />
      case 'signup':
        return <SignupPage />
      case 'login':
        return <LoginPage />
      case 'profile':
        return <ProfilePage userId={profileUserId} />
      case 'bookmarks':
        return <BookmarksPage />
      case 'my-stories':
        return <MyStoriesPage />
      case 'not-found':
        return <NotFoundPage />
      default:
        return <HomePage />
    }
  }

  // Show skeleton while hydrating
  if (!hydrated) {
    return (
      <div className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {getPageSkeleton(currentPage)}
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pageKey}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
      <KeyboardShortcuts />
      <CommandPalette />
      <MobileNav />
      {/* Bottom spacer for mobile nav bar */}
      <div className="md:hidden h-16" aria-hidden="true" />
    </div>
  )
}
