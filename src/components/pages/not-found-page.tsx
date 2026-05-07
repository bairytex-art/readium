'use client'

import { useNavigation } from '@/lib/store'
import { BookOpen, Search, Home, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeIn, fadeUp, scaleIn, transitions } from '@/lib/animations'

export function NotFoundPage() {
  const { navigate } = useNavigation()

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden gradient-hero">
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 sm:left-20 float-animation pointer-events-none">
        <BookOpen className="w-8 h-8 text-primary/10" />
      </div>
      <div className="absolute top-32 right-16 sm:right-32 float-slow pointer-events-none">
        <Search className="w-6 h-6 text-amber/15" />
      </div>
      <div className="absolute bottom-32 left-1/4 float-delayed pointer-events-none">
        <BookOpen className="w-10 h-10 text-primary/[0.07]" />
      </div>
      <div className="absolute bottom-20 right-1/4 float-animation pointer-events-none">
        <Search className="w-7 h-7 text-amber/10" />
      </div>

      {/* Background circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* Large 404 number */}
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          transition={transitions.slow}
          className="mb-6"
        >
          <span className="font-serif-display text-[8rem] sm:text-[10rem] lg:text-[12rem] font-bold leading-none gradient-text select-none">
            404
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.normal, delay: 0.15 }}
          className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
        >
          Lost in the pages
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.normal, delay: 0.25 }}
          className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10 max-w-lg mx-auto"
        >
          The story you&apos;re looking for doesn&apos;t exist, or has been moved.
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.normal, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="h-px w-12 bg-border" />
          <div className="w-2 h-2 rounded-full bg-amber/50" />
          <div className="h-px w-12 bg-border" />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.normal, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => navigate('home')}
            size="xl"
            className="rounded-xl"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Button>
          <Button
            onClick={() => navigate('read')}
            variant="outline"
            size="xl"
            className="rounded-xl group"
          >
            <BookOpen className="w-5 h-5" />
            Explore Stories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Decorative book illustration */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.slow, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-4 text-muted-foreground/20"
          aria-hidden="true"
        >
          <div className="w-16 h-px bg-border/50" />
          <BookOpen className="w-5 h-5" />
          <Search className="w-4 h-4" />
          <BookOpen className="w-5 h-5" />
          <div className="w-16 h-px bg-border/50" />
        </motion.div>
      </div>
    </div>
  )
}
