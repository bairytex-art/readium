import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"

// POST /api/posts/[id]/like — Toggle like on post
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const postId = params.id
  const userId = session.user.id

  // Check if post exists
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { id: true },
  })

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  // Check if already liked
  const existingLike = await db.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  })

  if (existingLike) {
    // Unlike
    await db.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })

    return NextResponse.json({ liked: false })
  } else {
    // Like
    await db.like.create({
      data: {
        userId,
        postId,
      },
    })

    return NextResponse.json({ liked: true })
  }
}
