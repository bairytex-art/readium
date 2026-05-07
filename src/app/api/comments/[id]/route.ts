import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

// DELETE /api/comments/[id] — Delete comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const comment = await db.comment.findUnique({
    where: { id: params.id },
    select: { authorId: true },
  })

  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 })
  }

  if (comment.authorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  await db.comment.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: "Comment deleted successfully" })
}
