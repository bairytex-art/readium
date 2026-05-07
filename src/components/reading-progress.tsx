'use client'

import { useState, useEffect } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import { Clock } from 'lucide-react'

interface ReadingProgressProps {
  readTime?: number
}

export function ReadingProgress({ readTime = 0 }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)
  const scaleX = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const readProgress = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(readProgress)
      scaleX.set(readProgress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scaleX])

  if (progress < 0.01) return null

  // Calculate remaining read time
  const remainingTime = Math.max(1, Math.ceil(readTime * (1 - progress)))
  const showTimeLeft = readTime > 0 && progress > 0.05 && progress < 0.95

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-amber/80 z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Time left indicator */}
      <AnimatePresence>
        {showTimeLeft && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 md:bottom-20 z-[60] glass-subtle backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-white/10 dark:border-white/5 shadow-lg"
            aria-label={`${remainingTime} minutes left to read`}
          >
            <Clock className="w-3 h-3 text-amber" />
            <span className="text-xs font-medium text-foreground">
              {remainingTime} min left
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
