'use client'

import { useNavigation } from '@/lib/store'
import { BookOpen, Heart, Twitter, Github, Linkedin, Mail, ArrowUpRight, ArrowUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useState, useCallback } from 'react'

const socialLinks = [
  { icon: <Twitter className="w-4 h-4" />, label: 'Twitter', href: '#' },
  { icon: <Github className="w-4 h-4" />, label: 'GitHub', href: '#' },
  { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', href: '#' },
  { icon: <Mail className="w-4 h-4" />, label: 'Email', href: 'mailto:hello@readium.com' },
]

export function Footer() {
  const { navigate } = useNavigation()
  const { toast } = useToast()
  const [email, setEmail] = useState('')

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

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <footer className="border-t border-border/40 bg-muted/20 mt-auto footer-wave">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-14 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 mb-5 group logo-hover"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight font-serif-display">
                Readium
              </span>
            </button>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm mb-6">
              Write what you experience. A clean, professional platform for readers and writers across the world.
            </p>
            {/* Social Links — Enhanced with scale + color transitions */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 hover:scale-110 active:scale-100 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Subtle separator on lg screens */}
          <div className="hidden lg:block lg:col-span-1 flex items-center justify-center">
            <div className="h-full w-px bg-border/30" />
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-base mb-4 text-foreground">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', page: 'home' as const },
                { label: 'Read', page: 'read' as const },
                { label: 'Write', page: 'write' as const },
                { label: 'Our Story', page: 'our-story' as const },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-muted-foreground hover:text-primary text-base transition-colors duration-200 animated-underline"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Subtle separator on lg screens */}
          <div className="hidden lg:block lg:col-span-1 flex items-center justify-center">
            <div className="h-full w-px bg-border/30" />
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-base mb-4 text-foreground">Categories</h4>
            <ul className="space-y-3">
              {['Travel', 'Technology', 'Culture', 'Lifestyle', 'Science', 'Business'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigate('read')}
                    className="text-muted-foreground hover:text-primary text-base transition-colors duration-200 animated-underline"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="font-semibold text-base mb-4 text-foreground">Stay inspired</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Get the best stories delivered to your inbox every week.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                className="input-readium text-sm py-2.5"
              />
              <button
                onClick={handleSubscribe}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1.5 btn-magnetic"
              >
                Subscribe
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Readium. All rights reserved.
            </p>
            {/* Status indicator */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 pulse-dot" />
              </span>
              <span className="text-muted-foreground text-xs">All systems operational</span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
              Made with <Heart className="w-3.5 h-3.5 text-amber fill-amber breathe" /> for readers and writers
            </p>
            {/* Version tag */}
            <span className="text-muted-foreground/50 text-xs font-mono px-2 py-0.5 rounded border border-border/30">v1.0</span>
            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-primary transition-colors duration-200 group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
