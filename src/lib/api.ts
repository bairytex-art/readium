// API Service Functions for Readium Backend

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com' 
  : 'http://localhost:3000'

// Auth API
export const authApi = {
  signup: async (data: { name: string; email: string; password: string }) => {
    const response = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Signup failed')
    }
    return response.json()
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/api/auth/callback/credentials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      throw new Error('Login failed')
    }
    return response.json()
  },
}

// Posts API
export const postsApi = {
  getPosts: async (params?: {
    category?: string
    search?: string
    sort?: string
    page?: number
    limit?: number
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.category && params.category !== 'All') {
      searchParams.set('category', params.category)
    }
    if (params?.search) {
      searchParams.set('search', params.search)
    }
    if (params?.sort) {
      searchParams.set('sort', params.sort)
    }
    if (params?.page) {
      searchParams.set('page', params.page.toString())
    }
    if (params?.limit) {
      searchParams.set('limit', params.limit.toString())
    }

    const response = await fetch(`${API_BASE}/api/posts?${searchParams}`)
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    return response.json()
  },

  getPost: async (id: string) => {
    const response = await fetch(`${API_BASE}/api/posts/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }
    return response.json()
  },

  createPost: async (data: {
    title: string
    excerpt?: string
    content: string
    coverImage?: string
    category: string
    tags: string[]
    status?: 'published' | 'draft'
  }) => {
    const response = await fetch(`${API_BASE}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to create post')
    }
    return response.json()
  },

  updatePost: async (id: string, data: Partial<{
    title: string
    excerpt: string
    content: string
    coverImage: string
    category: string
    tags: string[]
    status: 'published' | 'draft'
  }>) => {
    const response = await fetch(`${API_BASE}/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to update post')
    }
    return response.json()
  },

  deletePost: async (id: string) => {
    const response = await fetch(`${API_BASE}/api/posts/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete post')
    }
    return response.json()
  },

  toggleLike: async (postId: string) => {
    const response = await fetch(`${API_BASE}/api/posts/${postId}/like`, {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error('Failed to toggle like')
    }
    return response.json()
  },
}

// Users API
export const usersApi = {
  getUser: async (id: string) => {
    const response = await fetch(`${API_BASE}/api/users/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }
    return response.json()
  },

  updateUser: async (id: string, data: {
    name?: string
    bio?: string
    avatar?: string
  }) => {
    const response = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to update user')
    }
    return response.json()
  },

  getUserPosts: async (id: string, params?: {
    page?: number
    limit?: number
    status?: 'published' | 'draft'
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.page) {
      searchParams.set('page', params.page.toString())
    }
    if (params?.limit) {
      searchParams.set('limit', params.limit.toString())
    }
    if (params?.status) {
      searchParams.set('status', params.status)
    }

    const response = await fetch(`${API_BASE}/api/users/${id}/posts?${searchParams}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user posts')
    }
    return response.json()
  },

  toggleFollow: async (userId: string) => {
    const response = await fetch(`${API_BASE}/api/users/${userId}/follow`, {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error('Failed to toggle follow')
    }
    return response.json()
  },
}

// Comments API
export const commentsApi = {
  createComment: async (data: {
    content: string
    postId: string
  }) => {
    const response = await fetch(`${API_BASE}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to create comment')
    }
    return response.json()
  },

  deleteComment: async (id: string) => {
    const response = await fetch(`${API_BASE}/api/comments/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete comment')
    }
    return response.json()
  },

  getCommentsByPost: async (postId: string) => {
    const response = await fetch(`${API_BASE}/api/comments?postId=${postId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }
    return response.json()
  },
}

// Bookmarks API
export const bookmarksApi = {
  getBookmarks: async (params?: {
    page?: number
    limit?: number
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.page) {
      searchParams.set('page', params.page.toString())
    }
    if (params?.limit) {
      searchParams.set('limit', params.limit.toString())
    }

    const response = await fetch(`${API_BASE}/api/bookmarks?${searchParams}`)
    if (!response.ok) {
      throw new Error('Failed to fetch bookmarks')
    }
    return response.json()
  },

  toggleBookmark: async (postId: string) => {
    const response = await fetch(`${API_BASE}/api/bookmarks/${postId}`, {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error('Failed to toggle bookmark')
    }
    return response.json()
  },
}
