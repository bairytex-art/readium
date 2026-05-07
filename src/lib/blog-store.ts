import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { type BlogPost, blogPosts } from '@/lib/mock-data'

interface BlogState {
  posts: BlogPost[]
  currentDraft: Partial<BlogPost> | null
  editingPostId: string | null

  // CRUD
  createPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'status' | 'likes'>) => string
  saveDraft: (draft: Partial<BlogPost> & { title?: string }) => void
  updatePost: (id: string, updates: Partial<BlogPost>) => void
  deletePost: (id: string) => void
  publishDraft: (id: string) => void

  // Current draft management
  setCurrentDraft: (draft: Partial<BlogPost> | null) => void
  clearCurrentDraft: () => void
  setEditingPostId: (id: string | null) => void

  // Selectors
  getPostById: (id: string) => BlogPost | undefined
  getPublishedPosts: () => BlogPost[]
  getDraftsByAuthor: (authorId: string) => BlogPost[]
  getPublishedByAuthor: (authorId: string) => BlogPost[]
  getFeaturedPosts: () => BlogPost[]
}

export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      posts: blogPosts,
      currentDraft: null,
      editingPostId: null,

      createPost: (postData) => {
        const id = `post-${uuidv4().slice(0, 8)}`
        const now = new Date().toISOString().split('T')[0]
        const wordCount = postData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
        const readTime = Math.max(1, Math.ceil(wordCount / 200))

        const newPost: BlogPost = {
          ...postData,
          id,
          createdAt: now,
          status: 'published',
          likes: 0,
          readTime,
        }

        set((state) => ({
          posts: [newPost, ...state.posts],
          currentDraft: null,
          editingPostId: null,
        }))

        return id
      },

      saveDraft: (draft) => {
        const { editingPostId, posts } = get()
        const now = new Date().toISOString().split('T')[0]

        if (editingPostId) {
          // Update existing draft
          set({
            posts: posts.map((p) =>
              p.id === editingPostId
                ? { ...p, ...draft, updatedAt: now, status: 'draft' }
                : p
            ),
          })
        } else {
          // Check if a draft with same title exists
          const existingDraft = posts.find(
            (p) => p.status === 'draft' && p.title === draft.title && p.title
          )

          if (existingDraft) {
            set({
              posts: posts.map((p) =>
                p.id === existingDraft.id
                  ? { ...p, ...draft, updatedAt: now }
                  : p
              ),
            })
          } else {
            // Create new draft
            const id = `draft-${uuidv4().slice(0, 8)}`
            const newDraft: BlogPost = {
              id,
              title: draft.title || '',
              excerpt: draft.excerpt || '',
              content: draft.content || '',
              author: draft.author || { name: '', avatar: '', bio: '' },
              authorId: draft.authorId || '',
              category: draft.category || '',
              tags: draft.tags || [],
              coverImage: draft.coverImage || '',
              readTime: 0,
              likes: 0,
              createdAt: now,
              updatedAt: now,
              status: 'draft',
              featured: false,
              ...draft,
            }
            set((state) => ({
              posts: [newDraft, ...state.posts],
            }))
          }
        }
      },

      updatePost: (id, updates) => {
        const now = new Date().toISOString().split('T')[0]
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: now } : p
          ),
        }))
      },

      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
          editingPostId: state.editingPostId === id ? null : state.editingPostId,
        }))
      },

      publishDraft: (id) => {
        const now = new Date().toISOString().split('T')[0]
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id
              ? { ...p, status: 'published' as const, updatedAt: now, createdAt: p.createdAt || now }
              : p
          ),
          currentDraft: null,
          editingPostId: null,
        }))
      },

      setCurrentDraft: (draft) => {
        set({ currentDraft: draft })
      },

      clearCurrentDraft: () => {
        set({ currentDraft: null, editingPostId: null })
      },

      setEditingPostId: (id) => {
        set({ editingPostId: id })
      },

      getPostById: (id) => {
        return get().posts.find((p) => p.id === id)
      },

      getPublishedPosts: () => {
        return get().posts.filter((p) => p.status === 'published')
      },

      getDraftsByAuthor: (authorId) => {
        return get().posts.filter((p) => p.status === 'draft' && p.authorId === authorId)
      },

      getPublishedByAuthor: (authorId) => {
        return get().posts.filter((p) => p.status === 'published' && p.authorId === authorId)
      },

      getFeaturedPosts: () => {
        return get().posts.filter((p) => p.status === 'published' && p.featured)
      },
    }),
    {
      name: 'readium-blog',
      version: 1,
    }
  )
)
