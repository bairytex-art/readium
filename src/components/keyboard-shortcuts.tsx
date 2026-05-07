'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useNavigation, type Page } from '@/lib/store'

interface ShortcutEntry {
  keys: string[]
  description: string
  action?: () => void
}

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)
  const [gPressed, setGPressed] = useState(false)
  const navigate = useNavigation((s) => s.navigate)

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const shortcuts: ShortcutEntry[] = [
    {
      keys: ['⌘/Ctrl', 'K'],
      description: 'Search stories',
    },
    {
      keys: ['?'],
      description: 'Show keyboard shortcuts',
    },
    {
      keys: ['Esc'],
      description: 'Close dialogs / Clear search',
    },
    {
      keys: ['G', 'H'],
      description: 'Go to Home',
      action: () => navigate('home'),
    },
    {
      keys: ['G', 'R'],
      description: 'Go to Read',
      action: () => navigate('read'),
    },
    {
      keys: ['G', 'W'],
      description: 'Go to Write',
      action: () => navigate('write'),
    },
  ]

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      // --- G-then state machine ---
      if (gPressed) {
        // We're in the "waiting for second key" state
        if (e.key === 'h' || e.key === 'H') {
          e.preventDefault()
          navigate('home')
          setGPressed(false)
          return
        }
        if (e.key === 'r' || e.key === 'R') {
          e.preventDefault()
          navigate('read')
          setGPressed(false)
          return
        }
        if (e.key === 'w' || e.key === 'W') {
          e.preventDefault()
          navigate('write')
          setGPressed(false)
          return
        }
        // Non-matching key: reset the g flag
        setGPressed(false)
        // Fall through to handle this key normally
      }

      // --- Escape ---
      if (e.key === 'Escape') {
        if (isOpen) {
          close()
        }
        return
      }

      // Don't intercept shortcuts while typing
      if (isTyping) return

      // --- ? to open shortcuts ---
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        return
      }

      // --- G key: enter "waiting for second key" state ---
      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault()
        setGPressed(true)
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close, gPressed, navigate])

  // Reset gPressed after 500ms timeout
  useEffect(() => {
    if (!gPressed) return

    const timeout = setTimeout(() => {
      setGPressed(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [gPressed])

  // Close on click outside (backdrop)
  const handleBackdropClick = useCallback(() => {
    close()
  }, [close])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Dark backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal panel */}
          <motion.div
            className="glass relative z-10 w-full max-w-lg mx-4 rounded-2xl p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-foreground font-serif-display">
                Keyboard Shortcuts
              </h2>
              <button
                onClick={close}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close keyboard shortcuts"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Shortcuts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.description}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm text-foreground/80 truncate">
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    {shortcut.keys.map((key, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <kbd className="kbd">{key}</kbd>
                        {i < shortcut.keys.length - 1 && (
                          <span className="text-xs text-muted-foreground/60">
                            then
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer hint */}
            <p className="mt-4 text-xs text-muted-foreground/60 text-center">
              Press <kbd className="kbd">Esc</kbd> to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
