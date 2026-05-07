'use client'

import { useNavigation } from '@/lib/store'
import { blogPosts, categories } from '@/lib/mock-data'
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen, PenLine, Users, Globe, TrendingUp, Clock, Heart, Quote, Sparkles, Plane, Laptop, Leaf, Theater, HeartPulse, Utensils, Microscope, TrendingUp as TrendingUpIcon, Palette, Sprout, Star, Pen, Book, Feather } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion'
import { fadeUp, staggerContainer, staggerChild, staggerChildScale, heroTitle, viewportOnce, transitions } from '@/lib/animations'
import { SmartImage } from '@/components/smart-image'
import { useToast } from '@/hooks/use-toast'
import { useState, useRef, useEffect, useCallback } from 'react'

const featured = blogPosts.filter((b) => b.featured)
const recentPosts = blogPosts.slice(0, 6)

const categoryIcons: Record<string, React.ReactNode> = {
  Travel: <Plane className="w-4 h-4" />,
  Technology: <Laptop className="w-4 h-4" />,
  Lifestyle: <Leaf className="w-4 h-4" />,
  Culture: <Theater className="w-4 h-4" />,
  Health: <HeartPulse className="w-4 h-4" />,
  Food: <Utensils className="w-4 h-4" />,
  Science: <Microscope className="w-4 h-4" />,
  Business: <TrendingUpIcon className="w-4 h-4" />,
  Art: <Palette className="w-4 h-4" />,
  'Personal Growth': <Sprout className="w-4 h-4" />,
}

// Count-up animation component
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 20,
    duration: 1.5,
  })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(target)
    }
  }, [isInView, target, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return () => unsubscribe()
  }, [springValue])

  const formatNumber = (num: number) => {
    if (target >= 1000) {
      return num.toLocaleString()
    }
    return num.toString()
  }

  return (
    <span ref={ref}>
      {formatNumber(displayValue)}{suffix}
    </span>
  )
}

// Typing animation component
function TypingAnimation() {
  const [text, setText] = useState('Reading')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  
  const words = ['Reading', 'Writing']
  const currentWord = words[charIndex % words.length]
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000) // Pause before deleting
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCharIndex(charIndex + 1)
        }
      }
    }, isDeleting ? 50 : 150)
    
    return () => clearTimeout(timeout)
  }, [text, isDeleting, currentWord, charIndex])
  
  return (
    <span className="inline-block bg-gradient-to-r from-primary to-forest bg-clip-text text-transparent italic min-w-[80px]">
      {text}
      <span className="typing-cursor">|</span>
    </span>
  )
}

// Featured Stories Mobile Carousel
function FeaturedCarousel({ featured, openBlog }: { featured: typeof blogPosts; openBlog: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const slideCount = featured.length

  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const scrollLeft = container.scrollLeft
    const slideWidth = container.offsetWidth
    const newIndex = Math.round(scrollLeft / slideWidth)
    if (newIndex !== activeSlide) {
      setActiveSlide(newIndex)
    }
  }, [activeSlide])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToSlide = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const slideWidth = container.offsetWidth
    container.scrollTo({ left: slideWidth * index, behavior: 'smooth' })
    setActiveSlide(index)
  }, [])

  const goToPrev = useCallback(() => {
    scrollToSlide(activeSlide > 0 ? activeSlide - 1 : slideCount - 1)
  }, [activeSlide, slideCount, scrollToSlide])

  const goToNext = useCallback(() => {
    scrollToSlide(activeSlide < slideCount - 1 ? activeSlide + 1 : 0)
  }, [activeSlide, slideCount, scrollToSlide])

  return (
    <div className="lg:hidden relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 gap-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="region"
        aria-label="Featured stories carousel"
        aria-roledescription="carousel"
      >
        {featured.map((post, index) => (
          <div
            key={post.id}
            className="snap-center shrink-0 w-[85vw] max-w-[400px]"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${slideCount}: ${post.title}`}
          >
            <button
              onClick={() => openBlog(post.id)}
              className="group w-full text-left card-lift rounded-full bg-card border border-border/40 overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-[16/10] bg-muted">
                <SmartImage
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground px-2.5 py-0.5 text-xs shadow-lg">
                    Featured
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <Badge variant="secondary" className="mb-2 text-xs">
                  {post.category}
                </Badge>
                <h3 className="font-serif-display text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-muted-foreground text-xs">
                  <span className="font-medium text-foreground">{post.author.name}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
        aria-label="Previous featured story"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
        aria-label="Next featured story"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Carousel navigation">
        {featured.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeSlide
                ? 'bg-primary w-6'
                : 'bg-border w-2 hover:bg-muted-foreground/40'
            }`}
            role="tab"
            aria-selected={index === activeSlide}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export function HomePage() {
  const { navigate, openBlog } = useNavigation()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  // Mouse movement for interactive background
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const moveX = (clientX - (typeof window !== 'undefined' ? window.innerWidth : 1920) / 2) / 25
    const moveY = (clientY - (typeof window !== 'undefined' ? window.innerHeight : 1080) / 2) / 25
    mouseX.set(moveX)
    mouseY.set(moveY)
  }, [mouseX, mouseY])

  const handleSubscribe = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Subscribed!',
      description: 'You\'ll receive the best stories in your inbox every week.',
    })
    setEmail('')
  }

  return (
    <div className="flex flex-col" onMouseMove={handleMouseMove}>
      {/* Hero Section — Parallax */}
      <section ref={heroRef} className="relative overflow-hidden gradient-hero parallax-hero hero-gradient-border">
        {/* Animated Background Auras */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-aura-blob bg-primary/20 w-[40rem] h-[40rem] -top-20 -right-20" style={{ animationDelay: '0s' }} />
          <div className="hero-aura-blob bg-amber/20 w-[35rem] h-[35rem] -bottom-20 -left-20" style={{ animationDelay: '-5s' }} />
          <div className="hero-aura-blob bg-forest/15 w-[30rem] h-[30rem] top-1/4 left-1/3" style={{ animationDelay: '-10s' }} />
        </div>

        {/* Dot grid background */}
        <div className="absolute inset-0 hero-dot-grid hero-dot-grid-animated pointer-events-none" />

        {/* Parallax floating decorative elements */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-80 h-80 bg-primary/5 rounded-full blur-3xl float-animation breathe" />
          <div className="absolute bottom-0 right-[25%] w-[28rem] h-[28rem] bg-amber/5 rounded-full blur-3xl float-slow breathe" />
          <div className="absolute top-[40%] left-[5%] w-48 h-48 bg-forest/3 rounded-full blur-2xl float-delayed breathe" />
        </motion.div>

        {/* Floating Interactive Objects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div style={{ x: springMouseX, y: springMouseY }} className="absolute top-[15%] left-[12%] opacity-20 dark:opacity-10">
            <Pen className="w-12 h-12 text-primary rotate-[-15deg] float-animation" />
          </motion.div>
          <motion.div style={{ x: useTransform(springMouseX, (v) => -v * 1.5), y: useTransform(springMouseY, (v) => -v * 1.5) }} className="absolute top-[25%] right-[15%] opacity-15 dark:opacity-10">
            <Book className="w-16 h-16 text-amber rotate-[10deg] float-slow" />
          </motion.div>
          <motion.div style={{ x: useTransform(springMouseX, (v) => v * 0.8), y: useTransform(springMouseY, (v) => -v * 1.2) }} className="absolute bottom-[20%] left-[10%] opacity-20 dark:opacity-10">
            <Feather className="w-14 h-14 text-forest rotate-[20deg] float-delayed" />
          </motion.div>
          <motion.div style={{ x: useTransform(springMouseX, (v) => -v * 0.5), y: useTransform(springMouseY, (v) => v * 0.7) }} className="absolute bottom-[30%] right-[10%] opacity-15 dark:opacity-10">
            <Star className="w-10 h-10 text-primary rotate-[-5deg] float-animation" />
          </motion.div>
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <motion.div
            variants={heroTitle}
            initial="initial"
            animate="animate"
            className="max-w-4xl relative z-10"
          >
            <Badge className="mb-8 bg-amber/10 text-amber border-amber/20 px-5 py-2 text-sm font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              A new way to read &amp; write
            </Badge>
            <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-7xl font-bold leading-[1.08] tracking-tight mb-8 whitespace-nowrap">
              Best platform for{' '}
              <TypingAnimation />
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-4 whitespace-nowrap">
              A cleaner, quieter space to read what's real and write what's true.
            </p>
            {/* Decorative ornament */}
            <div className="divider-ornament max-w-xs mb-10 text-muted-foreground/40 text-xs">◆</div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('read')}
                size="xl"
                className="group rounded-full glow-primary btn-ripple btn-magnetic"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Reading
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate('write')}
                variant="outline"
                size="xl"
                className="rounded-full border-2 btn-magnetic"
              >
                <PenLine className="w-5 h-5 mr-2" />
                Start Writing
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      
      {/* Featured Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          transition={transitions.normal}
        >
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight">
                Featured Stories
              </h2>
              <p className="text-muted-foreground text-lg mt-3">Handpicked reads that inspire and captivate</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('read')}
              className="hidden sm:flex text-base group"
            >
              View all
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Carousel — visible below lg */}
          <FeaturedCarousel featured={featured} openBlog={openBlog} />

          {/* Desktop Featured Grid — visible at lg+ */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featured.map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={viewportOnce}
                transition={{ ...transitions.normal, delay: 0.1 + index * 0.1 }}
              >
                <button
                  onClick={() => openBlog(post.id)}
                  className="group w-full text-left card-editorial gradient-border-animated rounded-full"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-5 bg-muted">
                    <SmartImage
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full"
                    />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      {index === 0 && (
                        <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm shadow-lg tag-interactive">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-3 text-sm">
                    {post.category}
                  </Badge>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <span className="font-medium text-foreground">{post.author.name}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} min</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{post.likes}</span>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Section Divider */}
      <hr className="section-divider max-w-7xl mx-auto" />

      {/* Browse by Category */}
      <section className="bg-muted/30 border-y border-border/50 relative">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            transition={transitions.normal}
          >
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 gradient-text">
              Browse by Category
            </h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-xl mx-auto">
              Find stories that resonate with your interests and curiosities
            </p>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportOnce}
              className="flex flex-wrap justify-center gap-3"
            >
              {categories.filter(c => c !== 'All').map((category) => (
                <motion.button
                  key={category}
                  variants={staggerChildScale}
                  onClick={() => navigate('read')}
                  className="px-5 py-2.5 rounded-full bg-card border border-border/50 text-base font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105 transition-all duration-200 shadow-sm"
                >
                  <span className="flex items-center gap-1.5">
                    {categoryIcons[category] || <Globe className="w-4 h-4" />}
                    <span>{category}</span>
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      
      {/* Testimonials — Glassmorphism Cards */}
      <section className="bg-muted/20 border-y border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-[10%] w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl float-animation pointer-events-none" />
        <div className="absolute bottom-10 right-[15%] w-48 h-48 bg-amber/[0.04] rounded-full blur-2xl float-slow pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            transition={transitions.normal}
          >
            <div className="text-center mb-14">
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Loved by writers &amp; readers
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                See what our users say
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportOnce}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {[
                {
                  quote: 'Readium changed how I share my travel experiences. The clean editor lets me focus on the story, and the community actually reads.',
                  name: 'Sarah Mitchell',
                  role: 'Travel Writer',
                  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&auto=format',
                },
                {
                  quote: 'I tried every blogging platform out there. Readium is the first one that feels like it was designed by someone who actually writes.',
                  name: 'David Chen',
                  role: 'Startup Founder',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format',
                },
                {
                  quote: 'The reading experience is unmatched. No pop-ups, no distractions — just beautiful words on a clean page. Exactly how it should be.',
                  name: 'Elena Kowalski',
                  role: 'Neuroscientist & Writer',
                  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format',
                },
              ].map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  variants={staggerChild}
                  className="glass card-tilt p-7 rounded-2xl border border-white/10 dark:border-white/5 shadow-sm"
                >
                  <Quote className="w-8 h-8 text-amber/30 mb-4 breathe" />
                  <p className="text-foreground leading-relaxed mb-6 text-base">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/10">
                      <SmartImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-muted-foreground text-xs">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section — Noise overlay */}
      <section className="gradient-cta text-primary-foreground dark:text-primary relative overflow-hidden gradient-border-animated">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        {/* Decorative breathing elements */}
        <div className="absolute top-10 left-[10%] w-48 h-48 bg-white/[0.03] rounded-full blur-2xl breathe pointer-events-none" />
        <div className="absolute bottom-10 right-[15%] w-64 h-64 bg-white/[0.02] rounded-full blur-3xl breathe pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            transition={transitions.normal}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 dark:text-[#1B4332]">
              Your story deserves to be told
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/80 dark:text-[#1B4332]/80 leading-relaxed mb-10">
              Start Writing or Reading Today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('write')}
                variant="default"
                size="xl"
                className="rounded-full bg-yellow-100 text-foreground dark:bg-[#1B4332] dark:text-white hover:bg-yellow-200 dark:hover:bg-[#1B4332]/90 hover:glow-amber btn-ripple btn-magnetic"
              >
                <PenLine className="w-5 h-5 mr-2" />
                Start Writing — It&apos;s Free
              </Button>
              <Button
                onClick={() => navigate('read')}
                variant="outline"
                size="xl"
                className="rounded-full border-forest/30 bg-white text-forest dark:bg-white dark:text-[#1B4332] dark:border-[#1B4332]/30 hover:bg-white/90 dark:hover:bg-[#1B4332]/5 btn-magnetic"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Stories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter — Glassmorphism */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          transition={transitions.normal}
          className="relative glass-subtle border border-border/30 rounded-2xl p-8 sm:p-14 text-center max-w-2xl mx-auto overflow-hidden cursor-glow newsletter-border-animated"
        >
          {/* Subtle gradient background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-amber/3 pointer-events-none" />
          <div className="absolute inset-0 noise-overlay pointer-events-none" />

          <div className="relative">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold mb-3">
              Stay inspired
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              Get the best stories delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                className="input-readium sm:flex-1"
                aria-label="Email address for newsletter"
              />
              <Button size="lg" className="rounded-full shrink-0 btn-ripple btn-magnetic" onClick={handleSubscribe}>
                Subscribe
              </Button>
            </div>
            <p className="text-muted-foreground/50 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
