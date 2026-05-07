'use client'

import { useState, useEffect, useCallback } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { List, ChevronRight } from 'lucide-react'

interface HeadingItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  contentSelector?: string
}

function useHeadings(contentSelector: string) {
  const [headings, setHeadings] = useState<HeadingItem[]>([])

  useEffect(() => {
    const extractHeadings = () => {
      const container = document.querySelector(contentSelector)
      if (!container) return

      const elements = container.querySelectorAll('h2, h3')
      const items: HeadingItem[] = []

      elements.forEach((el, index) => {
        // Generate an id if the heading doesn't have one
        if (!el.id) {
          el.id = `heading-${index}-${el.textContent?.trim().replace(/\s+/g, '-').toLowerCase() || index}`
        }
        items.push({
          id: el.id,
          text: el.textContent?.trim() || '',
          level: parseInt(el.tagName[1], 10),
        })
      })

      setHeadings(items)
    }

    // Use rAF to defer DOM reading and setState to after paint
    const rafId = requestAnimationFrame(extractHeadings)
    return () => cancelAnimationFrame(rafId)
  }, [contentSelector])

  return headings
}

function useActiveHeading(headings: HeadingItem[], contentSelector: string) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const container = document.querySelector(contentSelector)
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings, contentSelector])

  return activeId
}

function TOCList({
  headings,
  activeId,
  onHeadingClick,
}: {
  headings: HeadingItem[]
  activeId: string
  onHeadingClick: (id: string) => void
}) {
  if (headings.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => onHeadingClick(heading.id)}
              className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200 flex items-center gap-2 group ${
                heading.level === 3 ? 'pl-6' : ''
              } ${
                activeId === heading.id
                  ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 border-l-2 border-transparent'
              }`}
              aria-current={activeId === heading.id ? 'true' : undefined}
            >
              {heading.level === 3 && (
                <ChevronRight className="w-3 h-3 shrink-0 opacity-40" />
              )}
              <span className="line-clamp-2">{heading.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function TableOfContents({ contentSelector = '.prose-readium' }: TableOfContentsProps) {
  const headings = useHeadings(contentSelector)
  const activeId = useActiveHeading(headings, contentSelector)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleHeadingClick = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setSheetOpen(false)
    }
  }, [])

  if (headings.length === 0) return null

  return (
    <>
      {/* Mobile: Sheet trigger button */}
      <div className="lg:hidden mb-4">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-xl gap-2 text-sm" aria-label="Open table of contents">
              <List className="w-4 h-4 text-primary" />
              Contents
              <span className="text-muted-foreground text-xs">({headings.length})</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl max-h-[70vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <List className="w-5 h-5 text-primary" />
                On this page
              </SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-6">
              <TOCList headings={headings} activeId={activeId} onHeadingClick={handleHeadingClick} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Plain list for sidebar */}
      <div className="hidden lg:block">
        <h4 className="font-bold text-sm mb-3 font-serif-display text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <List className="w-4 h-4" />
          On this page
        </h4>
        <TOCList headings={headings} activeId={activeId} onHeadingClick={handleHeadingClick} />
      </div>
    </>
  )
}
