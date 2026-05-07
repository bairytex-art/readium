'use client'

import { useNavigation, type Page } from '@/lib/store'
import { useAuthStore } from '@/lib/auth-store'
import { Home, BookOpen, PenLine, User } from 'lucide-react'
import { useState, useCallback } from 'react'

const navItems: { page: Page; label: string; icon: typeof Home }[] = [
  { page: 'home', label: 'Home', icon: Home },
  { page: 'read', label: 'Read', icon: BookOpen },
  { page: 'write', label: 'Write', icon: PenLine },
  { page: 'profile', label: 'Profile', icon: User },
]

export function MobileNav() {
  const { currentPage, navigate } = useNavigation()
  const { isAuthenticated } = useAuthStore()
  const [lastTapped, setLastTapped] = useState<Page | null>(null)

  const handleNavClick = useCallback((page: Page) => {
    // Trigger nav-bounce animation briefly
    setLastTapped(page)
    setTimeout(() => setLastTapped(null), 300)

    if (page === 'profile' && !isAuthenticated) {
      navigate('login')
      return
    }
    if (page === 'write' && !isAuthenticated) {
      navigate('login')
      return
    }
    navigate(page)
  }, [isAuthenticated, navigate])

  // Determine active state — highlight profile if on profile/bookmarks/my-stories
  const isActive = (page: Page) => {
    if (page === 'profile') {
      return ['profile', 'bookmarks', 'my-stories'].includes(currentPage)
    }
    return currentPage === page
  }

  // Determine which page the profile tab should show as active
  const getActiveProfilePage = (): Page => 'profile'

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-subtle backdrop-blur-xl border-t border-border/40 card-dark-glow"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ page, label, icon: Icon }) => {
          const active = isActive(page)
          return (
            <button
              key={page}
              onClick={() => handleNavClick(page === 'profile' ? getActiveProfilePage() : page)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg transition-colors ${
                lastTapped === page ? 'nav-bounce' : ''
              }`}
              aria-label={page === 'profile' && !isAuthenticated ? 'Log in' : label}
              aria-current={active ? 'page' : undefined}
            >
              {/* Active dot indicator */}
              <span
                className={`absolute top-1.5 w-1 h-1 rounded-full transition-all duration-200 ${
                  active ? 'bg-primary scale-100 pulse-dot' : 'scale-0'
                }`}
                aria-hidden="true"
              />
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-[10px] font-medium leading-tight transition-colors duration-200 ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {page === 'profile' && !isAuthenticated ? 'Login' : label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
