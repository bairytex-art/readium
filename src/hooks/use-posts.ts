import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi } from '@/lib/api'

export function usePosts(params?: {
  category?: string
  search?: string
  sort?: string
  page?: number
  limit?: number
}) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => postsApi.getPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postsApi.getPost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: (data) => {
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.setQueryData(['post', data.post.id], data.post)
    },
    onError: (error) => {
      console.error('Create post failed:', error)
    },
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      postsApi.updatePost(id, data),
    onSuccess: (data) => {
      // Update the post in cache
      queryClient.setQueryData(['post', data.post.id], data.post)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error('Update post failed:', error)
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: (_, variables) => {
      // Remove post from cache
      queryClient.removeQueries({ queryKey: ['post', variables] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error('Delete post failed:', error)
    },
  })
}

export function useToggleLike() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (postId: string) => postsApi.toggleLike(postId),
    onSuccess: (data, variables) => {
      // Update post in cache with new like status
      queryClient.setQueryData(['post', variables], (old: any) => {
        if (old?.post) {
          return {
            ...old,
            post: {
              ...old.post,
              _count: {
                ...old.post._count,
                likes: data.liked ? old.post._count.likes + 1 : old.post._count.likes - 1
              }
            }
          }
        }
        return old
      })
      // Invalidate posts list to update like counts
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error('Toggle like failed:', error)
    },
  })
}
