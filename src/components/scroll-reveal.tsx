'use client'

import { useRef, useEffect, type ReactNode } from 'react'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale'

interface ScrollRevealProps {
  children: ReactNode
  direction?: RevealDirection
  delay?: number
  duration?: number
  className?: string
  stagger?: number // stagger index (1-6)
}

/**
 * A performant scroll-reveal wrapper using Intersection Observer + CSS animations.
 * Prefer this over framer-motion's whileInView for simple reveal animations.
 * Respects prefers-reduced-motion: animations are disabled if the user prefers reduced motion.
 * Only triggers once — no re-animation on scroll back.
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay,
  duration,
  className = '',
  stagger,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Make element visible immediately without animation
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply custom duration via inline style if provided
          if (duration) {
            el.style.animationDuration = `${duration}ms`
          }
          // Apply custom delay via inline style if provided (stagger classes take precedence if set)
          if (delay && !stagger) {
            el.style.animationDelay = `${delay}ms`
          }
          el.classList.add('is-visible')
          observer.unobserve(el) // Only trigger once
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [delay, duration, stagger])

  const directionClass = `reveal-${direction}`
  const staggerClass = stagger && stagger >= 1 && stagger <= 6 ? `stagger-${stagger}` : ''

  return (
    <div
      ref={ref}
      className={`${directionClass} ${staggerClass} ${className}`.trim()}
      aria-hidden="false"
    >
      {children}
    </div>
  )
}
