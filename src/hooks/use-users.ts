import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '@/lib/api'

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getUser(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useUserPosts(id: string, params?: {
  page?: number
  limit?: number
  status?: 'published' | 'draft'
}) {
  return useQuery({
    queryKey: ['user-posts', id, params],
    queryFn: () => usersApi.getUserPosts(id, params),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useToggleFollow() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userId: string) => usersApi.toggleFollow(userId),
    onSuccess: (data, variables) => {
      // Update user cache with new follow status
      queryClient.setQueryData(['user', variables], (old: any) => {
        if (old?.user) {
          return {
            ...old,
            user: {
              ...old.user,
              _count: {
                ...old.user._count,
                followers: data.following ? old.user._count.followers + 1 : old.user._count.followers - 1
              }
            }
          }
        }
        return old
      })
      // Invalidate user posts to update follow status
      queryClient.invalidateQueries({ queryKey: ['user-posts'] })
    },
    onError: (error) => {
      console.error('Toggle follow failed:', error)
    },
  })
}
