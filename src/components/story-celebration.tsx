'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { SmartImage } from '@/components/smart-image'

interface RelatedPost {
  id: string
  title: string
  coverImage: string
  author: {
    name: string
    avatar: string
  }
  readTime: number
}

interface StoryCelebrationProps {
  readTime: number
  relatedPosts: RelatedPost[]
  onReadNext: (id: string) => void
}

// CSS-based confetti particle component
function ConfettiParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => {
    const colors = ['bg-primary', 'bg-amber', 'bg-sage', 'bg-rose-400', 'bg-emerald-400']
    const shapes = ['rounded-full', 'rounded-sm', 'rotate-45']
    const color = colors[i % colors.length]
    const shape = shapes[i % shapes.length]
    const size = 6 + Math.random() * 8
    const angle = (Math.PI * 2 * i) / 25 + (Math.random() - 0.5) * 0.5
    const distance = 80 + Math.random() * 200
    const dx = Math.cos(angle) * distance
    const dy = Math.sin(angle) * distance
    const delay = Math.random() * 0.15
    const duration = 1.2 + Math.random() * 0.8

    return { color, shape, size, dx, dy, delay, duration, id: i }
  })

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.color} ${p.shape}`}
          style={{
            width: p.size,
            height: p.size,
            top: '50%',
            left: '50%',
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 0,
          }}
          animate={{
            x: p.dx,
            y: p.dy - 40,
            opacity: 0,
            scale: 1,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  )
}

export function StoryCelebration({ readTime, relatedPosts, onReadNext }: StoryCelebrationProps) {
  const [progress, setProgress] = useState(0)
  const [celebrated, setCelebrated] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showReadNext, setShowReadNext] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const hasCelebratedRef = useRef(false)
  const autoDismissRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { toast } = useToast()

  // Pick a related post (first one or random)
  const nextPost = relatedPosts.length > 0 ? relatedPosts[Math.floor(Math.random() * Math.min(relatedPosts.length, 3))] : null

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const readProgress = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(readProgress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trigger celebration at 95%
  const triggerCelebration = useCallback(() => {
    if (hasCelebratedRef.current) return
    hasCelebratedRef.current = true
    setCelebrated(true)

    // Show confetti
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2500)

    // Show toast
    setTimeout(() => {
      toast({
        title: '🎉 You finished this story!',
        description: 'Great reading! Here\'s a suggestion for what to read next.',
      })
    }, 600)

    // Show read next card after confetti settles
    setTimeout(() => {
      if (!dismissed) {
        setShowReadNext(true)
      }
    }, 1200)
  }, [toast, dismissed])

  useEffect(() => {
    if (progress >= 0.95 && !hasCelebratedRef.current) {
      triggerCelebration()
    }
  }, [progress, triggerCelebration])

  // Auto-dismiss read next card after 10 seconds
  useEffect(() => {
    if (showReadNext && !dismissed) {
      autoDismissRef.current = setTimeout(() => {
        setDismissed(true)
        setShowReadNext(false)
      }, 10000)
    }
    return () => {
      if (autoDismissRef.current) {
        clearTimeout(autoDismissRef.current)
      }
    }
  }, [showReadNext, dismissed])

  const handleDismiss = () => {
    setDismissed(true)
    setShowReadNext(false)
    if (autoDismissRef.current) {
      clearTimeout(autoDismissRef.current)
    }
  }

  const handleReadNext = () => {
    if (nextPost) {
      handleDismiss()
      onReadNext(nextPost.id)
    }
  }

  if (readTime <= 0) return null

  return (
    <>
      {/* Confetti particles */}
      <AnimatePresence>
        {showConfetti && <ConfettiParticles />}
      </AnimatePresence>

      {/* What to read next card */}
      <AnimatePresence>
        {showReadNext && nextPost && !dismissed && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-4 left-4 md:left-auto md:w-80 md:bottom-20 z-[70] glass backdrop-blur-xl rounded-2xl border border-white/15 dark:border-white/10 shadow-2xl overflow-hidden"
            role="complementary"
            aria-label="What to read next"
          >
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                What to read next
              </p>

              <div className="flex gap-3">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0 ring-1 ring-black/5">
                  <SmartImage src={nextPost.coverImage} alt={nextPost.title} className="w-16 h-16" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm leading-snug line-clamp-2 mb-1">
                    {nextPost.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{nextPost.author.name}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {nextPost.readTime} min
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="default"
                size="sm"
                className="w-full mt-3 rounded-xl gap-2"
                onClick={handleReadNext}
              >
                Read next
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
