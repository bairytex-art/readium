'use client'

import { useState } from 'react'
import { useNavigation } from '@/lib/store'
import { useAuthStore } from '@/lib/auth-store'
import { BookOpen, Eye, EyeOff, ArrowRight, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn, transitions, staggerContainer, staggerChild } from '@/lib/animations'
import { useToast } from '@/hooks/use-toast'

export function LoginPage() {
  const { navigate } = useNavigation()
  const { login } = useAuthStore()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = login(email, password)
    if (result.success) {
      toast({
        title: 'Welcome back!',
        description: 'You have been logged in successfully.',
      })
      navigate('home')
    } else {
      toast({
        title: 'Login failed',
        description: result.error,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 gradient-hero relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl float-slow breathe pointer-events-none" />
      <div className="absolute bottom-20 left-[15%] w-48 h-48 bg-amber/[0.04] rounded-full blur-2xl float-animation breathe pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="w-full max-w-md relative z-10"
      >
        {/* Brand */}
        <motion.div variants={staggerChild} className="text-center mb-10">
          <button
            onClick={() => navigate('home')}
            className="inline-flex items-center gap-2.5 mb-5 group"
          >
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow duration-300">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight font-serif-display">
              Readium
            </span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 font-serif-display">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-lg">
            Log in to continue reading and writing
          </p>
          <p className="text-muted-foreground/60 text-sm mt-1.5 italic">
            Your stories are waiting for you
          </p>
        </motion.div>

        {/* Social Login */}
        <motion.div variants={staggerChild} className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl font-medium border-border/80 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl font-medium border-border/80 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </Button>
        </motion.div>

        {/* Divider */}
        <motion.div variants={staggerChild} className="mb-6">
          <div className="divider-ornament text-muted-foreground/40 text-xs">
            or log in with email
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={staggerContainer}
          onSubmit={handleSubmit}
          className="space-y-5 cursor-glow gradient-border-animated rounded-2xl p-6"
        >
          <motion.div variants={staggerChild}>
            <label className="block text-base font-medium mb-2">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-readium py-3.5"
            />
          </motion.div>

          <motion.div variants={staggerChild}>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-base font-medium">Password</label>
              <button
                type="button"
                className="text-sm text-primary font-medium animated-underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-readium py-3.5 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </motion.div>

          <motion.div variants={staggerChild} className="flex items-center gap-3">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">
              Remember me for 30 days
            </label>
          </motion.div>

          <motion.div variants={staggerChild}>
            <Button
              type="submit"
              size="xl"
              className="w-full font-semibold group rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 btn-magnetic"
            >
              Log In
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </motion.form>

        {/* Trust Indicator */}
        <motion.div
          variants={staggerChild}
          className="mt-8 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-muted/40 border border-border/40"
        >
          <Users className="w-4 h-4 text-amber shrink-0 pulse-dot" />
          <p className="text-sm text-muted-foreground">
            Join <span className="font-semibold text-foreground">5,400+</span> writers who share their stories on Readium
          </p>
        </motion.div>

        {/* Demo credentials hint */}
        <motion.div
          variants={staggerChild}
          className="mt-4 text-center"
        >
          <p className="text-xs text-muted-foreground/50">
            Demo: <span className="font-mono text-muted-foreground/70">sarah@readium.com</span> / <span className="font-mono text-muted-foreground/70">demo123</span>
          </p>
        </motion.div>

        {/* Signup Link */}
        <motion.p
          variants={staggerChild}
          className="text-center mt-6 text-base text-muted-foreground"
        >
          Don&apos;t have an account?{' '}
          <button
            onClick={() => navigate('signup')}
            className="text-primary font-semibold animated-underline"
          >
            Sign up
          </button>
        </motion.p>
      </motion.div>
    </div>
  )
}
