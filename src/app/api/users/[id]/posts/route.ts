import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/users/[id]/posts — Get user's posts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const status = searchParams.get("status") || "published"

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where: {
        authorId: params.id,
        status,
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        tags: { select: { name: true } },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.post.count({
      where: {
        authorId: params.id,
        status,
      },
    }),
  ])

  return NextResponse.json({ posts, total, page, limit })
}
