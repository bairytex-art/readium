import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"

// POST /api/users/[id]/follow — Toggle follow user
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const followerId = session.user.id
  const followingId = params.id

  // Can't follow yourself
  if (followerId === followingId) {
    return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 })
  }

  // Check if user exists
  const userToFollow = await db.user.findUnique({
    where: { id: followingId },
    select: { id: true },
  })

  if (!userToFollow) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Check if already following
  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  })

  if (existingFollow) {
    // Unfollow
    await db.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    })

    return NextResponse.json({ following: false })
  } else {
    // Follow
    await db.follow.create({
      data: {
        followerId,
        followingId,
      },
    })

    return NextResponse.json({ following: true })
  }
}
