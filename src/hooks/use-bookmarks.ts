import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookmarksApi } from '@/lib/api'

export function useBookmarks(params?: {
  page?: number
  limit?: number
}) {
  return useQuery({
    queryKey: ['bookmarks', params],
    queryFn: () => bookmarksApi.getBookmarks(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useToggleBookmark() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (postId: string) => bookmarksApi.toggleBookmark(postId),
    onSuccess: (data, variables) => {
      // Update post in cache with new bookmark status
      queryClient.setQueryData(['post', variables], (old: any) => {
        if (old?.post) {
          return {
            ...old,
            post: {
              ...old.post,
              bookmarked: data.bookmarked
            }
          }
        }
        return old
      })
      // Invalidate bookmarks list
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
    },
    onError: (error) => {
      console.error('Toggle bookmark failed:', error)
    },
  })
}
