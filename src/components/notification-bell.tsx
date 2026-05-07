'use client'

import { useState, useEffect, useRef } from 'react'
import { Bell, Heart, MessageCircle, UserPlus, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigation } from '@/lib/store'
import { notificationsApi } from '@/lib/api'

interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow'
  message: string
  time: string
  read: boolean
  link?: { page: 'read' | 'profile' } & Record<string, string>
  actor?: {
    id: string
    name: string
    avatar?: string
  }
  post?: {
    id: string
    title: string
  }
}

const iconMap = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
}

const iconColorMap = {
  like: 'text-rose-500 bg-rose-500/10',
  comment: 'text-blue-500 bg-blue-500/10',
  follow: 'text-primary bg-primary/10',
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const { navigate, openProfile, openBlog } = useNavigation()

  const unreadCount = notifications.filter((n) => !n.read).length

  // Fetch notifications on mount and when panel opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications()
    }
  }, [isOpen])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const data = await notificationsApi.getNotifications({ limit: 20 })
      setNotifications(data)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const markAllAsRead = async () => {
    try {
      await notificationsApi.markAsRead(undefined, true)
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    }
  }

  const handleNotificationClick = async (notification: Notification) => {
    try {
      await notificationsApi.markAsRead([notification.id])
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
      )
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
    setIsOpen(false)
    if (notification.link) {
      if (notification.link.page === 'profile' && notification.link.id) {
        openProfile(notification.link.id)
      } else if (notification.link.page === 'read' && notification.link.id) {
        openBlog(notification.link.id)
      } else {
        navigate(notification.link.page)
      }
    }
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 rounded-xl hover:bg-muted transition-colors flex items-center justify-center"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <Bell className="w-[18px] h-[18px]" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-background"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card rounded-2xl shadow-xl shadow-black/10 border border-border/60 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
              <h3 className="font-semibold text-base">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                  aria-label="Mark all notifications as read"
                >
                  <Check className="w-3 h-3" />
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Bell className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification, index) => {
                const Icon = iconMap[notification.type]
                const colorClass = iconColorMap[notification.type]
                return (
                  <motion.button
                    key={notification.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.2 }}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full flex items-start gap-3 px-5 py-3.5 text-left hover:bg-muted/40 transition-colors duration-150 ${
                      !notification.read ? 'bg-primary/[0.03]' : ''
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm leading-snug ${
                          !notification.read ? 'font-medium text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                    )}
                  </motion.button>
                )
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-border/40 text-center">
              <button
                onClick={() => {
                  setIsOpen(false)
                  navigate('read')
                }}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all activity
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
