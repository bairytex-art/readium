import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"

// POST /api/bookmarks/[postId] — Toggle bookmark on post
export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const postId = params.postId
  const userId = session.user.id

  // Check if post exists
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { id: true },
  })

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  // Check if already bookmarked
  const existingBookmark = await db.bookmark.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  })

  if (existingBookmark) {
    // Remove bookmark
    await db.bookmark.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })

    return NextResponse.json({ bookmarked: false })
  } else {
    // Add bookmark
    await db.bookmark.create({
      data: {
        userId,
        postId,
      },
    })

    return NextResponse.json({ bookmarked: true })
  }
}
