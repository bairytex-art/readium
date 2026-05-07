'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigation } from '@/lib/store'
import { useAuthStore } from '@/lib/auth-store'
import { blogPosts } from '@/lib/mock-data'
import { useTheme } from 'next-themes'
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandEmpty,
} from '@/components/ui/command'
import {
  Home,
  BookOpen,
  PenLine,
  Users,
  LogIn,
  UserPlus,
  Sun,
  Moon,
  Bookmark,
  FileText,
  User,
  Search,
} from 'lucide-react'
import { useHydrated } from '@/hooks/use-hydrated'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { navigate, openBlog } = useNavigation()
  const { isAuthenticated } = useAuthStore()
  const { theme, setTheme } = useTheme()
  const hydrated = useHydrated()

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleNavigate = useCallback(
    (page: Parameters<typeof navigate>[0]) => {
      navigate(page)
      handleClose()
    },
    [navigate, handleClose]
  )

  const handleOpenBlog = useCallback(
    (blogId: string) => {
      openBlog(blogId)
      handleClose()
    },
    [openBlog, handleClose]
  )

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    handleClose()
  }, [theme, setTheme, handleClose])

  const handleAuthAction = useCallback(
    (action: 'login' | 'signup') => {
      navigate(action)
      handleClose()
    },
    [navigate, handleClose]
  )

  const navItems = [
    { key: 'home', label: 'Home', icon: Home, action: () => handleNavigate('home') },
    { key: 'read', label: 'Read', icon: BookOpen, action: () => handleNavigate('read') },
    { key: 'write', label: 'Write', icon: PenLine, action: () => handleNavigate('write') },
    { key: 'our-story', label: 'Our Story', icon: Users, action: () => handleNavigate('our-story') },
  ]

  const authItems = !isAuthenticated
    ? [
        { key: 'login', label: 'Log in', icon: LogIn, action: () => handleAuthAction('login') },
        { key: 'signup', label: 'Sign up', icon: UserPlus, action: () => handleAuthAction('signup') },
        { key: 'theme', label: 'Toggle theme', icon: theme === 'dark' ? Sun : Moon, action: handleToggleTheme },
      ]
    : [
        { key: 'write', label: 'Write a Story', icon: PenLine, action: () => handleNavigate('write') },
        { key: 'bookmarks', label: 'Bookmarks', icon: Bookmark, action: () => handleNavigate('bookmarks') },
        { key: 'my-stories', label: 'My Stories', icon: FileText, action: () => handleNavigate('my-stories') },
        { key: 'profile', label: 'Profile', icon: User, action: () => handleNavigate('profile') },
        { key: 'theme', label: 'Toggle theme', icon: theme === 'dark' ? Sun : Moon, action: handleToggleTheme },
      ]

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Command Palette */}
          <motion.div
            className="fixed inset-x-0 top-[15%] z-[61] mx-auto max-w-xl px-4"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Command
              className="rounded-2xl border border-border/60 bg-popover shadow-2xl shadow-black/20 dark:shadow-black/40 overflow-hidden"
              loop
            >
              <div className="flex items-center border-b border-border/50 px-4">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <CommandInput
                  placeholder="Search stories, navigate, or take action..."
                  className="border-0 focus:ring-0 h-12 text-base"
                />
                <button
                  onClick={handleClose}
                  className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close command palette"
                >
                  <kbd className="kbd">Esc</kbd>
                </button>
              </div>

              <CommandList className="max-h-[360px] overflow-y-auto py-2">
                <CommandEmpty className="py-8 text-center text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No results found</p>
                </CommandEmpty>

                {/* Navigate Group */}
                <CommandGroup heading="Navigate" className="px-2">
                  {navItems.map((item) => (
                    <CommandItem
                      key={item.key}
                      onSelect={item.action}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer aria-selected:bg-accent/60"
                    >
                      <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator className="my-1" />

                {/* Search Stories Group */}
                <CommandGroup heading="Search Stories" className="px-2">
                  {blogPosts.slice(0, 8).map((post) => (
                    <CommandItem
                      key={post.id}
                      value={`${post.title} ${post.author.name} ${post.category}`}
                      onSelect={() => handleOpenBlog(post.id)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer aria-selected:bg-accent/60"
                    >
                      <BookOpen className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{post.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          by {post.author.name} &middot; {post.category}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{post.readTime}m</span>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator className="my-1" />

                {/* Actions Group */}
                <CommandGroup heading="Actions" className="px-2">
                  {authItems.map((item) => (
                    <CommandItem
                      key={item.key}
                      value={item.label}
                      onSelect={item.action}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer aria-selected:bg-accent/60"
                    >
                      <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>

              {/* Footer hint */}
              <div className="border-t border-border/50 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <kbd className="kbd">&uarr;</kbd>
                    <kbd className="kbd">&darr;</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="kbd">&crarr;</kbd>
                    select
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {hydrated ? (
                    <span className="flex items-center gap-1">
                      <kbd className="kbd">
                        {typeof navigator !== 'undefined' && /Mac/.test(navigator.userAgent) ? '⌘' : 'Ctrl'}
                      </kbd>
                      <kbd className="kbd">K</kbd>
                      to toggle
                    </span>
                  ) : null}
                </span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
