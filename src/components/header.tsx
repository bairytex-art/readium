'use client'

import { useNavigation, type Page } from '@/lib/store'
import { useAuthStore } from '@/lib/auth-store'
import { BookOpen, PenLine, Heart, Menu, X, LogIn, UserPlus, LogOut, Bookmark, User } from 'lucide-react'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { slideDown } from '@/lib/animations'
import { ThemeToggle } from '@/components/theme-toggle'
import { NotificationBell } from '@/components/notification-bell'
import { useHydrated } from '@/hooks/use-hydrated'
import { useToast } from '@/hooks/use-toast'

const navItems: { label: string; page: Page; icon?: React.ReactNode }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Read', page: 'read', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Write', page: 'write', icon: <PenLine className="w-4 h-4" /> },
  { label: 'Our Story', page: 'our-story', icon: <Heart className="w-4 h-4" /> },
]

export function Header() {
  const { currentPage, navigate } = useNavigation()
  const { user, isAuthenticated, logout } = useAuthStore()
  const hydrated = useHydrated()
  const { toast } = useToast()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  const handleNavigate = useCallback((page: Page) => {
    navigate(page)
    setMobileOpen(false)
  }, [navigate])

  const handleLogout = useCallback(() => {
    logout()
    setUserMenuOpen(false)
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    })
  }, [logout, toast])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
          : 'bg-background/80 backdrop-blur-lg border-b border-border/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 group logo-hover"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight font-serif-display">
              Readium
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 cursor-glow">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                  currentPage === item.page
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.icon}
                {item.label}
                {currentPage === item.page && (
                  <motion.div
                    layout
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <NotificationBell />

            {hydrated && isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-muted/60 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 ring-2 ring-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                    {user.avatar}
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">{user.name}</span>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-card border border-border/60 rounded-xl shadow-lg shadow-black/5 overflow-hidden card-dark-glow"
                    >
                      <div className="p-3 border-b border-border/40">
                        <div className="font-semibold text-sm truncate">{user.name}</div>
                        <div className="text-muted-foreground text-xs truncate">{user.email}</div>
                      </div>
                      <div className="p-1.5">
                        <button
                          onClick={() => { handleNavigate('write'); setUserMenuOpen(false) }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-muted/60 transition-colors text-left"
                        >
                          <PenLine className="w-4 h-4 text-muted-foreground" />
                          Write a Story
                        </button>
                        <button
                          onClick={() => { handleNavigate('bookmarks'); setUserMenuOpen(false) }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-muted/60 transition-colors text-left"
                        >
                          <Bookmark className="w-4 h-4 text-muted-foreground" />
                          Bookmarks
                        </button>
                        <button
                          onClick={() => { handleNavigate('my-stories'); setUserMenuOpen(false) }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-muted/60 transition-colors text-left"
                        >
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          My Stories
                        </button>
                        <button
                          onClick={() => { handleNavigate('profile'); setUserMenuOpen(false) }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-muted/60 transition-colors text-left"
                        >
                          <User className="w-4 h-4 text-muted-foreground" />
                          Profile
                        </button>
                        <div className="my-1 border-t border-border/40" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => handleNavigate('login')}
                  className="text-base"
                >
                  <LogIn className="w-4 h-4" />
                  Log in
                </Button>
                <Button
                  size="md"
                  onClick={() => handleNavigate('signup')}
                  className="rounded-full btn-magnetic"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <NotificationBell />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl hover:bg-muted transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={slideDown}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.page}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavigate(item.page)}
                  className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-lg font-medium transition-all ${
                    currentPage === item.page
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-3 mt-2 border-t border-border/30"
              >
                {hydrated && isAuthenticated && user ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 ring-2 ring-primary/15 flex items-center justify-center text-sm font-bold text-primary">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-base">{user.name}</div>
                        <div className="text-muted-foreground text-sm">{user.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => { handleNavigate('write'); setMobileOpen(false) }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <PenLine className="w-4 h-4" />
                      Write a Story
                    </button>
                    <button
                      onClick={() => { handleNavigate('bookmarks'); setMobileOpen(false) }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <Bookmark className="w-4 h-4" />
                      Bookmarks
                    </button>
                    <button
                      onClick={() => { handleNavigate('my-stories'); setMobileOpen(false) }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      My Stories
                    </button>
                    <button
                      onClick={() => { handleLogout(); setMobileOpen(false) }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigate('login')}
                      className="text-lg justify-start px-4 py-3.5 h-auto rounded-xl"
                    >
                      <LogIn className="w-4 h-4" />
                      Log in
                    </Button>
                    <Button
                      onClick={() => handleNavigate('signup')}
                      className="text-lg py-3.5 h-auto rounded-full"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign up
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
