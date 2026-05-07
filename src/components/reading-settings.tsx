'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Type, X, RotateCcw } from 'lucide-react'
import { useHydrated } from '@/hooks/use-hydrated'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

type FontSize = 'small' | 'medium' | 'large'
type FontFamily = 'serif' | 'sans'
type LineHeight = 'compact' | 'comfortable' | 'spacious'

interface ReadingSettings {
  fontSize: FontSize
  fontFamily: FontFamily
  lineHeight: LineHeight
}

const STORAGE_KEY = 'readium-reading-settings'

const defaultSettings: ReadingSettings = {
  fontSize: 'medium',
  fontFamily: 'serif',
  lineHeight: 'comfortable',
}

const fontSizeMap: Record<FontSize, { label: string; value: string; px: string }> = {
  small: { label: 'Small', value: '1rem', px: '16px' },
  medium: { label: 'Medium', value: '1.125rem', px: '18px' },
  large: { label: 'Large', value: '1.375rem', px: '22px' },
}

const lineHeightMap: Record<LineHeight, { label: string; value: string }> = {
  compact: { label: 'Compact', value: '1.6' },
  comfortable: { label: 'Comfortable', value: '1.8' },
  spacious: { label: 'Spacious', value: '2.1' },
}

function loadSettings(): ReadingSettings {
  if (typeof window === 'undefined') return defaultSettings
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...defaultSettings, ...parsed }
    }
  } catch {
    // ignore
  }
  return defaultSettings
}

function saveSettings(settings: ReadingSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // ignore
  }
}

// Shared settings content rendered in both mobile sheet and desktop panel
function SettingsContent({
  settings,
  updateSetting,
  handleReset,
}: {
  settings: ReadingSettings
  updateSetting: <K extends keyof ReadingSettings>(key: K, value: ReadingSettings[K]) => void
  handleReset: () => void
}) {
  return (
    <div className="space-y-8">
      {/* Font Size */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">
          Font Size
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(fontSizeMap) as [FontSize, typeof fontSizeMap[FontSize]][]).map(
            ([key, config]) => (
              <button
                key={key}
                onClick={() => updateSetting('fontSize', key)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                  settings.fontSize === key
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
                }`}
                aria-label={`Font size: ${config.label} (${config.px})`}
                aria-pressed={settings.fontSize === key}
              >
                <span
                  className="font-medium leading-none"
                  style={{ fontSize: key === 'small' ? '0.875rem' : key === 'medium' ? '1rem' : '1.25rem' }}
                >
                  Aa
                </span>
                <span className="text-[10px] font-semibold">{config.px}</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Font Family */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">
          Font Family
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateSetting('fontFamily', 'serif')}
            className={`flex flex-col items-center gap-1.5 p-3.5 rounded-xl border transition-all duration-200 ${
              settings.fontFamily === 'serif'
                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                : 'border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
            }`}
            aria-label="Serif font"
            aria-pressed={settings.fontFamily === 'serif'}
          >
            <span className="font-serif-display text-lg leading-none">Aa</span>
            <span className="text-[10px] font-semibold">Serif</span>
          </button>
          <button
            onClick={() => updateSetting('fontFamily', 'sans')}
            className={`flex flex-col items-center gap-1.5 p-3.5 rounded-xl border transition-all duration-200 ${
              settings.fontFamily === 'sans'
                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                : 'border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
            }`}
            aria-label="Sans-serif font"
            aria-pressed={settings.fontFamily === 'sans'}
          >
            <span className="text-lg leading-none" style={{ fontFamily: 'system-ui, sans-serif' }}>Aa</span>
            <span className="text-[10px] font-semibold">Sans-serif</span>
          </button>
        </div>
      </div>

      {/* Line Height */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">
          Line Height
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(lineHeightMap) as [LineHeight, typeof lineHeightMap[LineHeight]][]).map(
            ([key, config]) => (
              <button
                key={key}
                onClick={() => updateSetting('lineHeight', key)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all duration-200 ${
                  settings.lineHeight === key
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
                }`}
                aria-label={`Line height: ${config.label}`}
                aria-pressed={settings.lineHeight === key}
              >
                <div className="flex flex-col items-center gap-[2px]" aria-hidden="true">
                  <div className={`w-6 h-[2px] rounded-full bg-current ${key === 'compact' ? 'opacity-80' : 'opacity-60'}`} />
                  <div className={`w-5 h-[2px] rounded-full bg-current ${key === 'compact' ? 'opacity-60' : 'opacity-40'}`} />
                  <div className={`w-6 h-[2px] rounded-full bg-current ${key === 'compact' ? 'opacity-80' : 'opacity-60'}`} />
                </div>
                <span className="text-[10px] font-semibold">{config.label}</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">
          Preview
        </label>
        <div
          className="p-4 rounded-xl bg-muted/30 border border-border/30"
          style={{
            fontSize: fontSizeMap[settings.fontSize].value,
            lineHeight: lineHeightMap[settings.lineHeight].value,
            fontFamily:
              settings.fontFamily === 'serif'
                ? "'Playfair Display', Georgia, serif"
                : 'system-ui, sans-serif',
            transition: 'all 0.3s ease',
          }}
        >
          The art of reading is a skill that evolves over time. Each story opens a new window into a different world.
        </div>
      </div>

      {/* Reset */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Reset to default settings"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset defaults
        </button>
        <span className="text-xs text-muted-foreground/60">Auto-saved</span>
      </div>
    </div>
  )
}

export function ReadingSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 1023px)').matches
  })
  const [settings, setSettings] = useState<ReadingSettings>(() => {
    if (typeof window === 'undefined') return defaultSettings
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) }
      }
    } catch {
      // ignore
    }
    return defaultSettings
  })
  const hydrated = useHydrated()

  // Detect mobile viewport changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(max-width: 1023px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // Apply settings to prose-readium content in real-time
  useEffect(() => {
    if (!hydrated) return

    const proseEl = document.querySelector('.prose-readium')
    if (proseEl) {
      proseEl.style.fontSize = fontSizeMap[settings.fontSize].value
      proseEl.style.lineHeight = lineHeightMap[settings.lineHeight].value
      proseEl.style.fontFamily =
        settings.fontFamily === 'serif'
          ? "'Playfair Display', Georgia, serif"
          : "var(--font-sans), system-ui, sans-serif"
    }

    saveSettings(settings)
  }, [settings, hydrated])

  const updateSetting = useCallback(<K extends keyof ReadingSettings>(key: K, value: ReadingSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleReset = useCallback(() => {
    setSettings(defaultSettings)
  }, [])

  return (
    <>
      {/* Mobile: Aa button at bottom-right (above mobile nav) + Bottom Sheet */}
      {isMobile && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <motion.button
              className="fixed right-4 bottom-20 z-40 flex items-center gap-2 bg-card border border-border/60 rounded-full px-3.5 py-2.5 shadow-lg shadow-black/5 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              aria-label="Reading settings"
            >
              <Type className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">Aa</span>
            </motion.button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl max-h-[85vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2.5">
                <Type className="w-5 h-5 text-primary" />
                Reading Settings
              </SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-6">
              <SettingsContent
                settings={settings}
                updateSetting={updateSetting}
                handleReset={handleReset}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop: Aa button at right side + Slide-in panel */}
      {!isMobile && (
        <>
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex items-center gap-2 bg-card border border-border/60 rounded-full px-3.5 py-2.5 shadow-lg shadow-black/5 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            aria-label="Reading settings"
          >
            <Type className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">Aa</span>
          </motion.button>

          {/* Desktop Settings Panel Overlay */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setIsOpen(false)}
                  aria-hidden="true"
                />

                {/* Panel */}
                <motion.div
                  className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-card border-l border-border/60 shadow-2xl shadow-black/10 flex flex-col"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Reading settings"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-border/40">
                    <div className="flex items-center gap-2.5">
                      <Type className="w-5 h-5 text-primary" />
                      <h2 className="font-serif-display text-lg font-bold">Reading Settings</h2>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label="Close reading settings"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Settings content */}
                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <SettingsContent
                      settings={settings}
                      updateSetting={updateSetting}
                      handleReset={handleReset}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  )
}
