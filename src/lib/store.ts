import { create } from 'zustand'

export type Page = 'home' | 'read' | 'write' | 'our-story' | 'signup' | 'login' | 'profile' | 'bookmarks' | 'my-stories'

interface NavigationState {
  currentPage: Page
  selectedBlogId: string | null
  profileUserId: string | null
  initialCategory: string | null
  navigate: (page: Page) => void
  openBlog: (blogId: string) => void
  goBack: () => void
  openProfile: (userId: string) => void
  readWithCategory: (category: string) => void
}

export const useNavigation = create<NavigationState>((set) => ({
  currentPage: 'home',
  selectedBlogId: null,
  profileUserId: null,
  initialCategory: null,

  navigate: (page) => {
    set({ currentPage: page, selectedBlogId: null, profileUserId: null, initialCategory: null })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },

  openBlog: (blogId) => {
    set({ selectedBlogId: blogId })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },

  goBack: () => {
    set({ selectedBlogId: null })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },

  openProfile: (userId) => {
    set({ currentPage: 'profile', profileUserId: userId, selectedBlogId: null, initialCategory: null })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },

  readWithCategory: (category) => {
    set({ currentPage: 'read', initialCategory: category, selectedBlogId: null, profileUserId: null })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
}))
