'use client'

import { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@/lib/store'
import { categories } from '@/lib/mock-data'
import {
  ImagePlus, Bold, Italic, Link2, List, ListOrdered, Quote,
  Heading1, Heading2, Heading3, Code, Eye, Save, SendHorizontal,
  X, Type, Clock, Hash, FolderOpen, PenLine, Check, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerChildScale, viewportOnce, transitions } from '@/lib/animations'
import { useToast } from '@/hooks/use-toast'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'draft-saved'
type FormatAction = 'h1' | 'h2' | 'h3' | 'bold' | 'italic' | 'quote' | 'code' | 'ul' | 'ol' | 'link'

const toolbarItems: { icon: React.ReactNode; label: string; action: FormatAction }[][] = [
  [
    { icon: <Heading1 className="w-[18px] h-[18px]" />, label: 'Heading 1', action: 'h1' },
    { icon: <Heading2 className="w-[18px] h-[18px]" />, label: 'Heading 2', action: 'h2' },
    { icon: <Heading3 className="w-[18px] h-[18px]" />, label: 'Heading 3', action: 'h3' },
  ],
  [
    { icon: <Bold className="w-[18px] h-[18px]" />, label: 'Bold', action: 'bold' },
    { icon: <Italic className="w-[18px] h-[18px]" />, label: 'Italic', action: 'italic' },
    { icon: <Quote className="w-[18px] h-[18px]" />, label: 'Quote', action: 'quote' },
    { icon: <Code className="w-[18px] h-[18px]" />, label: 'Code', action: 'code' },
  ],
  [
    { icon: <List className="w-[18px] h-[18px]" />, label: 'Unordered List', action: 'ul' },
    { icon: <ListOrdered className="w-[18px] h-[18px]" />, label: 'Ordered List', action: 'ol' },
    { icon: <Link2 className="w-[18px] h-[18px]" />, label: 'Link', action: 'link' },
  ],
]

export function WritePage() {
  const { navigate } = useNavigation()
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [preview, setPreview] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const contentRef = useRef(content)

  // Keep contentRef in sync with content state for use in event handlers
  useEffect(() => {
    contentRef.current = content
  }, [content])

  // Auto-save simulation
  useEffect(() => {
    if (!title && !content) return

    const interval = setInterval(() => {
      if (title || content) {
        setSaveStatus('saving')
        setTimeout(() => {
          setSaveStatus('saved')
          setTimeout(() => {
            setSaveStatus('draft-saved')
          }, 2000)
        }, 800)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [title, content])

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const handleSaveDraft = () => {
    setSaveStatus('saving')
    setTimeout(() => {
      setSaveStatus('draft-saved')
      toast({
        title: 'Draft saved',
        description: 'Your story has been saved as a draft.',
      })
    }, 800)
  }

  const handlePublish = () => {
    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please add a title before publishing.',
        variant: 'destructive',
      })
      return
    }
    if (!content.trim()) {
      toast({
        title: 'Content required',
        description: 'Please write some content before publishing.',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Story published! 🎉',
      description: 'Your story is now live and visible to readers.',
    })
    navigate('read')
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))
  const wordGoal = 1000
  const wordProgress = Math.min(100, Math.round((wordCount / wordGoal) * 100))

  // Toolbar formatting handler - only accesses ref in event handlers
  const handleToolbarAction = (action: FormatAction) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const currentContent = contentRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const wrapSelection = (prefix: string, suffix: string = prefix) => {
      const selectedText = currentContent.substring(start, end)
      const before = currentContent.substring(0, start)
      const after = currentContent.substring(end)
      const newContent = before + prefix + selectedText + suffix + after
      setContent(newContent)
      requestAnimationFrame(() => {
        textarea.focus()
        if (selectedText.length > 0) {
          textarea.setSelectionRange(start + prefix.length, end + prefix.length)
        } else {
          textarea.setSelectionRange(start + prefix.length, start + prefix.length)
        }
      })
    }

    const insertAtLineStart = (prefix: string) => {
      const before = currentContent.substring(0, start)
      const after = currentContent.substring(start)
      const lineStart = before.lastIndexOf('\n') + 1
      const lineContent = before.substring(lineStart)
      const newContent = currentContent.substring(0, lineStart) + prefix + lineContent + after
      setContent(newContent)
      requestAnimationFrame(() => {
        textarea.focus()
        textarea.setSelectionRange(start + prefix.length, start + prefix.length)
      })
    }

    switch (action) {
      case 'h1': insertAtLineStart('# '); break
      case 'h2': insertAtLineStart('## '); break
      case 'h3': insertAtLineStart('### '); break
      case 'bold': wrapSelection('**'); break
      case 'italic': wrapSelection('*'); break
      case 'quote': insertAtLineStart('> '); break
      case 'code': wrapSelection('`'); break
      case 'ul': insertAtLineStart('- '); break
      case 'ol': insertAtLineStart('1. '); break
      case 'link': wrapSelection('[', '](url)'); break
    }
  }

  const handleCoverUpload = () => {
    const images = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=450&fit=crop',
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)]
    setCoverImage(randomImage)
  }

  const removeCover = () => {
    setCoverImage(null)
  }

  // Progress ring SVG parameters
  const ringRadius = 28
  const ringStroke = 4
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = ringCircumference - (wordProgress / 100) * ringCircumference

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <motion.div
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={transitions.normal}
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...transitions.normal, delay: 0.05 }}
            >
              <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Write a Story
              </h1>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...transitions.normal, delay: 0.1 }}
              className="flex items-center gap-3 mt-2"
            >
              <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                Share your experience with the world. Every great story starts with a single word.
              </p>
              {/* Auto-save indicator */}
              <AnimatePresence mode="wait">
                {saveStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-1.5 text-xs font-medium shrink-0 ${saveStatus === 'saved' ? 'autosave-pulse' : ''}`}
                  >
                    {saveStatus === 'saving' && (
                      <>
                        <Loader2 className="w-3.5 h-3.5 text-amber animate-spin" />
                        <span className="text-amber">Saving...</span>
                      </>
                    )}
                    {saveStatus === 'saved' && (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Saved</span>
                      </>
                    )}
                    {saveStatus === 'draft-saved' && (
                      <>
                        <Check className="w-3.5 h-3.5 text-muted-foreground/60" />
                        <span className="text-muted-foreground/60">Draft saved</span>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ ...transitions.normal, delay: 0.15 }}
            className="hidden sm:flex items-center gap-3 shrink-0"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setPreview(!preview)}
              className="rounded-xl btn-magnetic"
            >
              <Eye className="w-4 h-4 mr-2" />
              {preview ? 'Edit' : 'Preview'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleSaveDraft}
              className="rounded-xl btn-magnetic"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button
              variant="amber"
              size="lg"
              onClick={handlePublish}
              className="rounded-xl btn-ripple btn-magnetic"
            >
              <SendHorizontal className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </motion.div>
        </div>

        {/* Mobile Actions */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.normal, delay: 0.15 }}
          className="sm:hidden flex gap-2 mb-8 overflow-x-auto pb-2"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreview(!preview)}
            className="rounded-lg shrink-0 btn-magnetic"
          >
            <Eye className="w-4 h-4 mr-1.5" />
            {preview ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveDraft} className="rounded-lg shrink-0 btn-magnetic">
            <Save className="w-4 h-4 mr-1.5" />
            Save
          </Button>
          <Button variant="amber" size="sm" onClick={handlePublish} className="rounded-lg shrink-0 btn-ripple btn-magnetic">
            <SendHorizontal className="w-4 h-4 mr-1.5" />
            Publish
          </Button>
        </motion.div>

        {!preview ? (
          <div className="space-y-8">
            {/* Cover Image Upload / Preview */}
            <motion.div
              variants={staggerChildScale}
              initial="initial"
              animate="animate"
              transition={transitions.normal}
            >
              {coverImage ? (
                <div className="group relative w-full rounded-2xl overflow-hidden aspect-[16/9]">
                  <img
                    src={coverImage}
                    alt="Cover image preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                  <button
                    onClick={removeCover}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/80"
                    aria-label="Remove cover image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/50 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200">
                    Click ✕ to remove
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleCoverUpload}
                  className="group relative w-full rounded-2xl border-2 border-dashed border-border/40 bg-muted/10 hover:border-amber/50 hover:bg-amber/[0.03] transition-all duration-300 cursor-pointer overflow-hidden gradient-border-animated"
                >
                  <div className="flex flex-col items-center justify-center py-14 sm:py-20 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/8 group-hover:bg-amber/10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110">
                      <ImagePlus className="w-8 h-8 text-primary group-hover:text-amber transition-colors duration-300" />
                    </div>
                    <p className="text-lg font-semibold mb-1.5 group-hover:text-amber transition-colors duration-300">Add a cover image</p>
                    <p className="text-muted-foreground text-base">Click or drag and drop to upload</p>
                    <p className="text-muted-foreground/50 text-sm mt-2">Recommended: 1600 × 900px, JPG or PNG</p>
                  </div>
                </button>
              )}
            </motion.div>

            {/* Title */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...transitions.normal, delay: 0.05 }}
              className="flex items-start gap-4"
            >
              <input
                type="text"
                placeholder="Your story title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-serif-display flex-1 text-4xl sm:text-5xl font-bold placeholder:text-muted-foreground/25 focus:outline-none bg-transparent leading-tight py-2"
              />
              <span className="writing-cursor" />
            </motion.div>

            {/* Toolbar */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...transitions.normal, delay: 0.08 }}
              className="flex items-center gap-0.5 py-2.5 px-1 border-y border-border/40 bg-muted/15 rounded-lg overflow-x-auto cursor-glow"
            >
              {toolbarItems.map((group, groupIdx) => (
                <div key={groupIdx} className="flex items-center">
                  {groupIdx > 0 && (
                    <div className="w-px h-5 bg-border/40 mx-1.5 shrink-0" />
                  )}
                  {group.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleToolbarAction(item.action)}
                      title={item.label}
                      className="p-2 rounded-lg transition-all duration-150 shrink-0 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              ))}
            </motion.div>

            {/* Content Editor */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...transitions.normal, delay: 0.1 }}
            >
              <textarea
                ref={textareaRef}
                placeholder="Tell your story... Use Markdown or rich text formatting from the toolbar above."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[480px] sm:min-h-[560px] text-lg leading-relaxed placeholder:text-muted-foreground/25 focus:outline-none bg-transparent resize-none border-t border-border/20 pt-6"
              />
            </motion.div>

            {/* Category Selection */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...transitions.normal, delay: 0.12 }}
              className="pt-8 border-t border-border/40"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <FolderOpen className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Category</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {categories.filter(c => c !== 'All').map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground shadow-sm btn-magnetic'
                        : 'bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground border border-border/40 hover:border-border/60'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...transitions.normal, delay: 0.14 }}
              className="pt-8 border-t border-border/40"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Hash className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Tags</h3>
                <span className="text-muted-foreground text-sm">(up to 5)</span>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="px-3.5 py-1.5 text-sm bg-primary/8 text-primary border border-primary/15 hover:bg-primary/12 transition-colors tag-interactive"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-destructive transition-colors duration-150"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {tags.length < 5 && (
                <input
                  type="text"
                  placeholder="Add a tag and press Enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="input-readium max-w-md"
                />
              )}
            </motion.div>
          </div>
        ) : (
          /* Preview Mode */
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={transitions.normal}
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-8">
              {/* Preview Cover */}
              {coverImage ? (
                <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-2xl bg-muted/20 border border-dashed border-border/30 aspect-[16/9] flex flex-col items-center justify-center">
                  <ImagePlus className="w-10 h-10 text-muted-foreground/20 mb-3" />
                  <p className="text-muted-foreground/40 text-base">Cover image will appear here</p>
                </div>
              )}

              {/* Preview Title */}
              {title ? (
                <h1 className="font-serif-display text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight">
                  {title}
                </h1>
              ) : (
                <p className="font-serif-display text-4xl sm:text-5xl text-muted-foreground/20 font-bold leading-[1.15] tracking-tight">
                  Your title will appear here...
                </p>
              )}

              {/* Preview Meta */}
              <div className="flex items-center gap-4 text-muted-foreground text-base pb-6 border-b border-border/30">
                {selectedCategory && (
                  <Badge variant="secondary" className="text-sm">{selectedCategory}</Badge>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {readTime} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Type className="w-4 h-4" />
                  {wordCount} words
                </span>
              </div>

              {/* Preview Content */}
              <div className="prose-readium">
                {content ? (
                  <p className="whitespace-pre-wrap leading-relaxed text-lg">{content}</p>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <PenLine className="w-10 h-10 text-muted-foreground/15 mb-4" />
                    <p className="text-muted-foreground/30 text-lg italic">Your story will appear here as you type...</p>
                    <p className="text-muted-foreground/20 text-sm mt-2">Switch to edit mode to start writing</p>
                  </div>
                )}
              </div>

              {/* Preview Tags */}
              {tags.length > 0 && (
                <div className="pt-8 border-t border-border/30">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Writing Stats with Progress Ring */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.normal, delay: 0.2 }}
          className="mt-12 p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/30 flex flex-wrap items-center gap-x-8 gap-y-4 card-editorial"
        >
          {/* Progress Ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg width="68" height="68" viewBox="0 0 68 68" className="-rotate-90">
              {/* Background ring */}
              <circle
                cx="34"
                cy="34"
                r={ringRadius}
                fill="none"
                stroke="currentColor"
                strokeWidth={ringStroke}
                className="text-muted-foreground/15"
              />
              {/* Progress ring */}
              <circle
                cx="34"
                cy="34"
                r={ringRadius}
                fill="none"
                stroke="currentColor"
                strokeWidth={ringStroke}
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                className={`transition-all duration-500 ease-out ${
                  wordProgress >= 100 ? 'text-emerald-500' : 'text-primary'
                }`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xs font-bold ${
                wordProgress >= 100 ? 'text-emerald-500' : 'text-primary'
              }`}>
                {wordProgress}%
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-muted-foreground text-sm">
            <span className="flex items-center gap-2">
              <Type className="w-4 h-4 text-primary/60" />
              <strong className="text-foreground font-semibold">{wordCount}</strong> words
              <span className="text-muted-foreground/40">/ {wordGoal} goal</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary/60" />
              <strong className="text-foreground font-semibold">{readTime}</strong> min read
            </span>
            <span className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-primary/60" />
              Category: <strong className="text-foreground font-semibold">{selectedCategory || 'None'}</strong>
            </span>
            <span className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary/60" />
              Tags: <strong className="text-foreground font-semibold">{tags.length}</strong>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
