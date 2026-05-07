import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

// GET /api/posts/[id] — Get single post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findUnique({
    where: { id: params.id },
    include: {
      author: { select: { id: true, name: true, avatar: true, bio: true } },
      tags: { select: { name: true } },
      comments: {
        include: {
          author: { select: { id: true, name: true, avatar: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
      _count: { select: { likes: true, comments: true } },
    },
  })

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  return NextResponse.json({ post })
}

// PUT /api/posts/[id] — Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const post = await db.post.findUnique({
    where: { id: params.id },
    select: { authorId: true },
  })

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  if (post.authorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await request.json()
  const { title, excerpt, content, coverImage, category, tags, status } = body

  const wordCount = content?.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length || 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const updatedPost = await db.post.update({
    where: { id: params.id },
    data: {
      title,
      excerpt,
      content,
      coverImage,
      category,
      readTime,
      status,
      publishedAt: status === "published" && !post.publishedAt ? new Date() : undefined,
      tags: {
        deleteMany: {},
        create: (tags || []).map((name: string) => ({ name })),
      },
    },
    include: {
      author: { select: { id: true, name: true, avatar: true, bio: true } },
      tags: { select: { name: true } },
    },
  })

  return NextResponse.json({ post: updatedPost })
}

// DELETE /api/posts/[id] — Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const post = await db.post.findUnique({
    where: { id: params.id },
    select: { authorId: true },
  })

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  if (post.authorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  await db.post.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: "Post deleted successfully" })
}
