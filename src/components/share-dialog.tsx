'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Link2, Check, Twitter, Facebook, Linkedin, Mail } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export function ShareDialog({ open, onOpenChange, title }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `"${title}" on Readium`

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({ title: 'Link copied!', description: 'Story link has been copied to clipboard.' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({ title: 'Failed to copy', description: 'Could not copy the link. Please try manually.', variant: 'destructive' })
    }
  }, [shareUrl, toast])

  const handleShareTwitter = useCallback(() => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400')
    onOpenChange(false)
  }, [shareText, shareUrl, onOpenChange])

  const handleShareFacebook = useCallback(() => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400')
    onOpenChange(false)
  }, [shareText, shareUrl, onOpenChange])

  const handleShareLinkedIn = useCallback(() => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400')
    onOpenChange(false)
  }, [shareUrl, onOpenChange])

  const handleShareEmail = useCallback(() => {
    const subject = encodeURIComponent(`Check out: ${title}`)
    const body = encodeURIComponent(`I thought you might enjoy this story: ${shareUrl}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
    onOpenChange(false)
  }, [title, shareUrl, onOpenChange])

  const shareOptions = [
    {
      key: 'copy',
      label: 'Copy Link',
      icon: copied ? Check : Link2,
      description: 'Copy to clipboard',
      color: copied ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground',
      bg: copied ? 'bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-950/30' : 'bg-muted/50 hover:bg-muted',
      action: handleCopyLink,
    },
    {
      key: 'twitter',
      label: 'Twitter / X',
      icon: Twitter,
      description: 'Share on X',
      color: 'text-sky-500',
      bg: 'bg-sky-50 dark:bg-sky-950/20 hover:bg-sky-100 dark:hover:bg-sky-950/30',
      action: handleShareTwitter,
    },
    {
      key: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      description: 'Share on Facebook',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/30',
      action: handleShareFacebook,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      description: 'Share on LinkedIn',
      color: 'text-blue-700 dark:text-blue-300',
      bg: 'bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/30',
      action: handleShareLinkedIn,
    },
    {
      key: 'email',
      label: 'Email',
      icon: Mail,
      description: 'Send via email',
      color: 'text-amber dark:text-amber',
      bg: 'bg-amber/5 hover:bg-amber/10',
      action: handleShareEmail,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="font-serif-display text-xl">Share this story</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1">
            Spread the word about &ldquo;{title}&rdquo;
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pt-4 pb-2">
          {/* URL preview */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border/50 mb-5">
            <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground truncate flex-1">{shareUrl}</span>
            <button
              onClick={handleCopyLink}
              className="text-xs font-medium text-primary hover:text-forest transition-colors shrink-0"
              aria-label="Copy link"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Share options grid */}
          <div className="grid grid-cols-1 gap-2.5">
            <AnimatePresence>
              {shareOptions.map((option, index) => (
                <motion.button
                  key={option.key}
                  onClick={option.action}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className={`flex items-center gap-3.5 p-3.5 rounded-xl border border-transparent transition-all duration-200 ${option.bg} hover:border-border/50 group w-full text-left`}
                  aria-label={option.description}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${option.bg} ${option.color} shrink-0 group-hover:scale-105 transition-transform`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                  {option.key === 'copy' && copied && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="ml-auto shrink-0"
                    >
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border/30 mt-2">
          <p className="text-xs text-muted-foreground text-center">
            Sharing helps writers reach more readers. Thank you!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
