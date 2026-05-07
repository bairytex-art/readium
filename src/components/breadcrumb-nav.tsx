'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'
import { useNavigation } from '@/lib/store'

export interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const { navigate } = useNavigation()

  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-center gap-1 text-sm text-muted-foreground py-2"
    >
      <button
        onClick={() => navigate('home')}
        className="inline-flex items-center justify-center rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Go to home page"
      >
        <Home className="h-4 w-4" />
      </button>

      {items.length > 0 && (
        <span className="breadcrumb-separator flex items-center" aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={index} className="flex items-center gap-1">
            {isLast ? (
              <span className="text-foreground font-medium truncate" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <button
                  onClick={item.onClick}
                  className="breadcrumb-item truncate transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
                <span className="breadcrumb-separator flex items-center" aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </>
            )}
          </span>
        )
      })}
    </motion.nav>
  )
}
