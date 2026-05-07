import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { type User, mockUsers } from '@/lib/mock-data'

interface AuthResult {
  success: boolean
  error?: string
}

interface AuthState {
  user: User | null
  users: User[]
  isAuthenticated: boolean
  signup: (name: string, email: string, password: string) => AuthResult
  login: (email: string, password: string) => AuthResult
  logout: () => void
  updateProfile: (updates: Partial<Pick<User, 'name' | 'bio' | 'avatar'>>) => void
  getUserById: (id: string) => User | undefined
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: mockUsers,
      isAuthenticated: false,

      signup: (name, email, password) => {
        const { users } = get()

        // Validation
        if (!name.trim()) {
          return { success: false, error: 'Name is required' }
        }
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return { success: false, error: 'Please enter a valid email address' }
        }
        if (password.length < 6) {
          return { success: false, error: 'Password must be at least 6 characters' }
        }
        if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
          return { success: false, error: 'An account with this email already exists' }
        }

        const initials = name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)

        const newUser: User = {
          id: `user-${uuidv4().slice(0, 8)}`,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          avatar: initials,
          bio: 'A new Readium writer. Stay tuned for stories!',
          createdAt: new Date().toISOString().split('T')[0],
        }

        set({
          user: newUser,
          users: [...users, newUser],
          isAuthenticated: true,
        })

        return { success: true }
      },

      login: (email, password) => {
        const { users } = get()
        const user = users.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
        )

        if (!user) {
          return { success: false, error: 'Invalid email or password' }
        }

        set({ user, isAuthenticated: true })
        return { success: true }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: (updates) => {
        const { user, users } = get()
        if (!user) return

        const updatedUser = { ...user, ...updates }

        // If name changed, recalculate avatar initials
        if (updates.name && updates.name !== user.name) {
          updatedUser.avatar = updates.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        }

        set({
          user: updatedUser,
          users: users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
        })
      },

      getUserById: (id) => {
        return get().users.find((u) => u.id === id)
      },
    }),
    {
      name: 'readium-auth',
      version: 1,
    }
  )
)
