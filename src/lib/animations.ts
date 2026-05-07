import type { Variants, Transition } from 'framer-motion'

// ===== SHARED TRANSITIONS =====
export const transitions = {
  fast: { duration: 0.2 } as Transition,
  normal: { duration: 0.4 } as Transition,
  slow: { duration: 0.6 } as Transition,
  spring: { type: 'spring', stiffness: 300, damping: 24 } as Transition,
  bouncy: { type: 'spring', stiffness: 400, damping: 17 } as Transition,
} as const

// ===== FADE VARIANTS =====
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
}

export const fadeDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export const fadeLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
}

export const fadeRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
}

// ===== SCALE VARIANTS =====
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const popIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

// ===== SLIDE VARIANTS =====
export const slideUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 20 },
}

export const slideDown: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
}

// ===== STAGGER CONTAINER =====
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

// ===== STAGGER CHILD =====
export const staggerChild: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const staggerChildScale: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// ===== PAGE TRANSITIONS =====
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25 },
  },
}

// ===== HERO SECTION =====
export const heroTitle: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ===== CARD VARIANTS =====
export const cardHover = {
  rest: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  hover: {
    y: -4,
    boxShadow: '0 12px 40px -12px rgba(27, 67, 50, 0.15)',
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
  },
}

// ===== VIEWPORT SETTINGS =====
export const viewportOnce = { once: true, margin: '-50px' }
export const viewportRepeat = { margin: '-50px' }
