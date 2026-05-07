import { useSession, signIn, signOut } from 'next-auth/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { authApi, usersApi } from '@/lib/api'

export function useAuth() {
  const { data: session, status } = useSession()
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      await signIn('credentials', { email, password, redirect: false })
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      // Auto-login after successful signup
      signIn('credentials', { 
        email: data.user.email, 
        password: '', // Will be handled by NextAuth callback
        redirect: false 
      })
    },
    onError: (error) => {
      console.error('Signup failed:', error)
    },
  })

  // Logout
  const logout = () => {
    signOut({ redirect: false })
  }

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name?: string; bio?: string; avatar?: string }) => {
      if (!session?.user?.id) throw new Error('Not authenticated')
      return usersApi.updateUser(session.user.id, data)
    },
    onSuccess: (data) => {
      // Update session data
      if (session?.user) {
        session.user.name = data.user.name || session.user.name
        session.user.bio = data.user.bio || session.user.bio
        session.user.avatar = data.user.avatar || session.user.avatar
      }
    },
    onError: (error) => {
      console.error('Profile update failed:', error)
    },
  })

  return {
    // Auth state
    user: session?.user || null,
    isLoading: status === 'loading',
    isAuthenticated: !!session?.user,
    
    // Actions
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    logout,
    updateProfile: updateProfileMutation.mutateAsync,
    
    // Loading states
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    
    // Error states
    loginError: loginMutation.error,
    signupError: signupMutation.error,
    updateProfileError: updateProfileMutation.error,
  }
}
