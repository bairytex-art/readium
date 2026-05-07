import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"

// GET /api/bookmarks — Get user's bookmarks
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "12")

  const [bookmarks, total] = await Promise.all([
    db.bookmark.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        post: {
          include: {
            author: { select: { id: true, name: true, avatar: true } },
            tags: { select: { name: true } },
            _count: { select: { likes: true, comments: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.bookmark.count({
      where: {
        userId: session.user.id,
      },
    }),
  ])

  return NextResponse.json({ 
    bookmarks: bookmarks.map(b => b.post), 
    total, 
    page, 
    limit 
  })
}
