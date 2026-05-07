import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// GET /api/posts — List published posts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const sort = searchParams.get("sort") || "newest"
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "12")

  const where: any = { status: "published" }
  if (category && category !== "All") where.category = category
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { excerpt: { contains: search } },
    ]
  }

  const orderBy: any =
    sort === "popular" ? { likes: { _count: "desc" } } :
    sort === "readTime" ? { readTime: "asc" } :
    { createdAt: "desc" }

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, avatar: true, bio: true } },
        tags: { select: { name: true } },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.post.count({ where }),
  ])

  return NextResponse.json({ posts, total, page, limit })
}

// POST /api/posts — Create new post
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { title, excerpt, content, coverImage, category, tags, status } = body

  const wordCount = content?.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length || 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const post = await db.post.create({
    data: {
      title,
      excerpt,
      content,
      coverImage,
      category,
      readTime,
      status: status || "published",
      featured: false,
      authorId: session.user.id,
      publishedAt: status === "published" ? new Date() : null,
      tags: {
        create: (tags || []).map((name: string) => ({ name })),
      },
    },
    include: {
      author: { select: { id: true, name: true, avatar: true, bio: true } },
      tags: { select: { name: true } },
    },
  })

  return NextResponse.json({ post }, { status: 201 })
}
