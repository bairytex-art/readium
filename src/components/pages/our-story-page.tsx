'use client'

import { useNavigation } from '@/lib/store'
import { BookOpen, Heart, Globe, Zap, Shield, Users, ArrowRight, PenLine, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerChild, fadeLeft, viewportOnce, transitions, heroTitle } from '@/lib/animations'
import { ScrollReveal } from '@/components/scroll-reveal'

const values = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Fast & Simple',
    description: 'No clutter, no distractions. Just you and the words. Our editor loads instantly and your stories publish in seconds.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Genuine & Human',
    description: 'Every story on Readium is written by a real person. We champion authenticity over virality and depth over clickbait.',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Clean & Readable',
    description: 'Beautiful typography, generous whitespace, and a reading experience designed to reduce eye strain and increase focus.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Open & Inclusive',
    description: 'Stories from every corner of the world. Every voice matters, every experience is worth sharing.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Respectful & Safe',
    description: 'Your words are yours. We never sell your data, run intrusive ads, or compromise your privacy.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community-Driven',
    description: 'Built by readers and writers, for readers and writers. Every feature exists because our community asked for it.',
  },
]

const timeline = [
  {
    year: '2023',
    title: 'The Idea',
    description: 'Frustrated with cluttered, ad-heavy blogging platforms, we started sketching a simpler alternative on a napkin in a coffee shop.',
  },
  {
    year: '2024',
    title: 'Building Readium',
    description: 'We spent a year obsessing over typography, whitespace, and the perfect reading experience. Every pixel was deliberate.',
  },
  {
    year: '2025',
    title: 'The Community Grows',
    description: 'Over 5,000 writers and 1.2 million readers joined Readium, proving that simplicity and quality resonate.',
  },
  {
    year: 'Now',
    title: 'The Journey Continues',
    description: 'We\'re just getting started. New features, new voices, and a commitment to always putting words first.',
  },
]

export function OurStoryPage() {
  const { navigate } = useNavigation()

  return (
    <div className="flex flex-col">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden gradient-hero parallax-hero">
        {/* Animated Background Auras */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-aura-blob bg-primary/10 w-[30rem] h-[30rem] -top-10 -right-10" style={{ animationDelay: '0s' }} />
          <div className="hero-aura-blob bg-amber/10 w-[25rem] h-[25rem] -bottom-10 -left-10" style={{ animationDelay: '-7s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative">
          {/* Floating decorative elements */}
          <div className="absolute top-10 right-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl float-animation pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-amber/[0.03] rounded-full blur-3xl float-slow pointer-events-none" />
          <div className="absolute inset-0 noise-overlay pointer-events-none" />
          <motion.div
            variants={heroTitle}
            initial="initial"
            animate="animate"
            className="max-w-3xl"
          >
            {/* Decorative ornament above heading */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-amber/60 breathe" />
              <div className="w-2 h-2 rounded-full bg-amber/60 breathe" />
              <div className="h-px w-8 bg-amber/40 breathe" />
            </motion.div>

            <h1 className="gradient-text font-serif-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-8">
              Our Story
            </h1>
            <p className="text-xl sm:text-2xl lg:text-[1.7rem] text-muted-foreground leading-relaxed">
              Readium was born from a simple belief: the best reading and writing experiences are clean, fast, and focused on what matters — the words.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Section Divider ===== */}
      <hr className="section-divider" />

      {/* ===== Mission ===== */}
      <section className="gradient-cta gradient-border-animated text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            transition={transitions.slow}
            className="max-w-3xl relative"
          >
            {/* Decorative quote mark */}
            <div className="absolute -top-4 -left-2 sm:-left-4 text-primary-foreground/[0.07] pointer-events-none select-none">
              <Quote className="w-24 h-24 sm:w-32 sm:h-32" />
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 relative">
              Our Mission
            </h2>
            <p className="text-xl sm:text-2xl text-primary-foreground/90 leading-relaxed mb-8 relative">
              To create the world&apos;s most thoughtful platform for reading and writing — where every story finds its reader, and every reader finds stories worth their time.
            </p>
            <p className="text-lg text-primary-foreground/70 leading-relaxed relative">
              We believe that the best ideas deserve a beautiful home. Not cluttered with ads. Not optimized for engagement metrics. Just words, thoughtfully presented, ready to move someone on the other side of the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Section Divider ===== */}
      <hr className="section-divider" />

      {/* ===== Values ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <ScrollReveal direction="up">
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            What We Stand For
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl mb-14 max-w-2xl leading-relaxed">
            These aren&apos;t just values on a page. They guide every decision we make, from product design to community policies.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <ScrollReveal
              key={value.title}
              direction="up"
              stagger={(index % 3) + 1 as 1 | 2 | 3}
            >
              <div className="card-lift card-editorial p-7 rounded-2xl border border-border/50 bg-card shadow-sm hover:shadow-lg hover:border-amber/20 h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber/15 to-primary/10 flex items-center justify-center text-amber mb-5">
                  {value.icon}
                </div>
                <h3 className="font-serif-display text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== Section Divider ===== */}
      <hr className="section-divider" />

      {/* ===== Timeline ===== */}
      <section className="bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <ScrollReveal direction="up">
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-14">
              Our Journey
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline Line — gradient + dashed */}
            <div
              className="absolute left-4 sm:left-8 top-0 bottom-0 w-px"
              style={{
                backgroundImage: 'linear-gradient(to bottom, var(--amber), var(--primary))',
                backgroundSize: '1px 8px',
                backgroundRepeat: 'repeat-y',
              }}
            />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <ScrollReveal
                  key={item.year}
                  direction="left"
                  stagger={(index + 1) as 1 | 2 | 3 | 4}
                >
                  <div className="relative pl-14 sm:pl-20">
                    {/* Timeline Dot with pulse */}
                    <div className="absolute left-2 sm:left-6 top-2 flex items-center justify-center">
                      <span className="absolute w-5 h-5 rounded-full bg-amber/30 animate-ping" style={{ animationDuration: '2s' }} />
                      <span className="relative w-4 h-4 rounded-full bg-amber border-[3px] border-background shadow-sm" />
                    </div>

                    <div className="bg-card p-6 sm:p-7 rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-amber/20 transition-all duration-300">
                      <span className="inline-block text-amber font-bold text-lg font-serif-display mb-1">{item.year}</span>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Team Note ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          transition={transitions.normal}
          className="max-w-3xl mx-auto text-center relative"
        >
          {/* Decorative ornament */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-10 bg-border breathe" />
            <div className="w-2 h-2 rounded-full bg-amber/50 breathe" />
            <div className="h-px w-10 bg-border breathe" />
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
            From our team to you
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            We&apos;re a small team of readers and writers who believe that the internet deserves better publishing tools. Thank you for being here. Your stories make Readium what it is.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('write')}
              variant="amber"
              size="xl"
              className="btn-magnetic"
            >
              <PenLine className="w-5 h-5" />
              Start Writing
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate('read')}
              variant="outline"
              size="xl"
              className="btn-magnetic"
            >
              <BookOpen className="w-5 h-5" />
              Explore Stories
            </Button>
          </div>

          {/* Bottom decorative ornament */}
          <div className="flex items-center justify-center gap-3 mt-14">
            <div className="h-px w-16 bg-border breathe" />
            <div className="divider-ornament text-xs text-muted-foreground/40 tracking-widest" />
            <div className="h-px w-16 bg-border breathe" />
          </div>
        </motion.div>
      </section>
    </div>
  )
}
