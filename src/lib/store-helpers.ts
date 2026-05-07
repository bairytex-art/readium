import { useBlogStore } from './blog-store'
import { useSocialStore } from './social-store'
import { useAuthStore } from './auth-store'

/**
 * Get a post with combined social data (likes, bookmarks, comments)
 * This is a utility, not a hook — call inside components.
 */
export function getPostWithSocialData(postId: string, userId?: string | null) {
  const post = useBlogStore.getState().getPostById(postId)
  if (!post) return null

  const social = useSocialStore.getState()

  return {
    ...post,
    likeCount: social.getLikeCount(postId, post.likes),
    isLiked: userId ? social.isLiked(postId, userId) : false,
    isBookmarked: userId ? social.isBookmarked(postId, userId) : false,
    commentCount: social.getCommentCount(postId),
    comments: social.getCommentsByPost(postId),
  }
}

/**
 * Get user info for an author ID
 */
export function getAuthorInfo(authorId: string) {
  const user = useAuthStore.getState().getUserById(authorId)
  return user || null
}

/**
 * Get all published posts with social data included
 */
export function getPublishedPostsSocial(userId?: string | null) {
  const posts = useBlogStore.getState().getPublishedPosts()
  const social = useSocialStore.getState()

  return posts.map((post) => ({
    ...post,
    likeCount: social.getLikeCount(post.id, post.likes),
    isLiked: userId ? social.isLiked(post.id, userId) : false,
    isBookmarked: userId ? social.isBookmarked(post.id, userId) : false,
    commentCount: social.getCommentCount(post.id),
  }))
}
