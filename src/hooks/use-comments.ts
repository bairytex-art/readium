import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { commentsApi } from '@/lib/api'

interface CreateCommentVariables {
  content: string
  postId: string
}

interface DeleteCommentVariables {
  id: string
  postId: string
}

export function useComments(postId: string) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentsApi.getCommentsByPost(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useCreateComment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (variables: CreateCommentVariables) => commentsApi.createComment(variables),
    onSuccess: (data, variables) => {
      // Add comment to cache
      queryClient.setQueryData(['comments', variables.postId], (old: any) => {
        const comments = old?.comments || []
        return {
          ...old,
          comments: [data.comment, ...comments]
        }
      })
      // Update post comment count
      queryClient.setQueryData(['post', variables.postId], (old: any) => {
        if (old?.post) {
          return {
            ...old,
            post: {
              ...old.post,
              _count: {
                ...old.post._count,
                comments: old.post._count.comments + 1
              }
            }
          }
        }
        return old
      })
    },
    onError: (error) => {
      console.error('Create comment failed:', error)
    },
  })
}

export function useDeleteComment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (variables: DeleteCommentVariables) => commentsApi.deleteComment(variables.id),
    onSuccess: (_, variables) => {
      // Remove comment from cache
      queryClient.setQueryData(['comments', variables.postId], (old: any) => {
        if (old?.comments) {
          return {
            ...old,
            comments: old.comments.filter((c: any) => c.id !== variables.id)
          }
        }
        return old
      })
      // Update post comment count
      queryClient.setQueryData(['post', variables.postId], (old: any) => {
        if (old?.post) {
          return {
            ...old,
            post: {
              ...old.post,
              _count: {
                ...old.post._count,
                comments: Math.max(0, old.post._count.comments - 1)
              }
            }
          }
        }
        return old
      })
    },
    onError: (error) => {
      console.error('Delete comment failed:', error)
    },
  })
}
