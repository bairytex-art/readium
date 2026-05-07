import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { type Comment, mockComments } from '@/lib/mock-data'

interface SocialState {
  // postId -> userId[]
  likes: Record<string, string[]>
  // postId -> userId[]
  bookmarks: Record<string, string[]>
  comments: Comment[]
  // followerId -> followingId[]
  follows: Record<string, string[]>

  // Likes
  toggleLike: (postId: string, userId: string) => void
  isLiked: (postId: string, userId: string) => boolean
  getLikeCount: (postId: string, baseLikes?: number) => number

  // Bookmarks
  toggleBookmark: (postId: string, userId: string) => void
  isBookmarked: (postId: string, userId: string) => boolean
  getBookmarkedPostIds: (userId: string) => string[]

  // Comments
  addComment: (postId: string, authorId: string, authorName: string, authorAvatar: string, content: string) => string
  deleteComment: (commentId: string, authorId: string) => boolean
  getCommentsByPost: (postId: string) => Comment[]
  getCommentCount: (postId: string) => number

  // Follows
  toggleFollow: (followerId: string, followingId: string) => void
  isFollowing: (followerId: string, followingId: string) => boolean
  getFollowerCount: (userId: string) => number
  getFollowingCount: (userId: string) => number
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      likes: {},
      bookmarks: {},
      comments: mockComments,
      follows: {},

      // Likes
      toggleLike: (postId, userId) => {
        set((state) => {
          const currentLikes = state.likes[postId] || []
          const isCurrentlyLiked = currentLikes.includes(userId)

          return {
            likes: {
              ...state.likes,
              [postId]: isCurrentlyLiked
                ? currentLikes.filter((id) => id !== userId)
                : [...currentLikes, userId],
            },
          }
        })
      },

      isLiked: (postId, userId) => {
        const likes = get().likes[postId] || []
        return likes.includes(userId)
      },

      getLikeCount: (postId, baseLikes = 0) => {
        const userLikes = get().likes[postId] || []
        return baseLikes + userLikes.length
      },

      // Bookmarks
      toggleBookmark: (postId, userId) => {
        set((state) => {
          const currentBookmarks = state.bookmarks[postId] || []
          const isCurrentlyBookmarked = currentBookmarks.includes(userId)

          return {
            bookmarks: {
              ...state.bookmarks,
              [postId]: isCurrentlyBookmarked
                ? currentBookmarks.filter((id) => id !== userId)
                : [...currentBookmarks, userId],
            },
          }
        })
      },

      isBookmarked: (postId, userId) => {
        const bookmarks = get().bookmarks[postId] || []
        return bookmarks.includes(userId)
      },

      getBookmarkedPostIds: (userId) => {
        const { bookmarks } = get()
        return Object.entries(bookmarks)
          .filter(([, userIds]) => userIds.includes(userId))
          .map(([postId]) => postId)
      },

      // Comments
      addComment: (postId, authorId, authorName, authorAvatar, content) => {
        const id = `comment-${uuidv4().slice(0, 8)}`
        const now = new Date().toISOString().split('T')[0]

        const newComment: Comment = {
          id,
          postId,
          authorId,
          authorName,
          authorAvatar,
          content,
          createdAt: now,
        }

        set((state) => ({
          comments: [...state.comments, newComment],
        }))

        return id
      },

      deleteComment: (commentId, authorId) => {
        const comment = get().comments.find((c) => c.id === commentId)
        if (!comment || comment.authorId !== authorId) return false

        set((state) => ({
          comments: state.comments.filter((c) => c.id !== commentId),
        }))
        return true
      },

      getCommentsByPost: (postId) => {
        return get().comments.filter((c) => c.postId === postId)
      },

      getCommentCount: (postId) => {
        return get().comments.filter((c) => c.postId === postId).length
      },

      // Follows
      toggleFollow: (followerId, followingId) => {
        if (followerId === followingId) return // Can't follow yourself

        set((state) => {
          const currentFollowing = state.follows[followerId] || []
          const isCurrentlyFollowing = currentFollowing.includes(followingId)

          return {
            follows: {
              ...state.follows,
              [followerId]: isCurrentlyFollowing
                ? currentFollowing.filter((id) => id !== followingId)
                : [...currentFollowing, followingId],
            },
          }
        })
      },

      isFollowing: (followerId, followingId) => {
        const following = get().follows[followerId] || []
        return following.includes(followingId)
      },

      getFollowerCount: (userId) => {
        const { follows } = get()
        let count = 0
        Object.values(follows).forEach((followingList) => {
          if (followingList.includes(userId)) count++
        })
        return count
      },

      getFollowingCount: (userId) => {
        return (get().follows[userId] || []).length
      },
    }),
    {
      name: 'readium-social',
      version: 1,
    }
  )
)
