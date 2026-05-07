import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'

// Temporary in-memory notification storage
let notifications: any[] = [
  {
    id: 'n1',
    type: 'like',
    message: "Someone liked your story 'The Art of Slow Travel'",
    time: '2m ago',
    read: false,
    link: { page: 'read', id: 'post1' },
    actor: { id: 'user1', name: 'John Doe', avatar: null },
    post: { id: 'post1', title: 'The Art of Slow Travel' }
  },
  {
    id: 'n2',
    type: 'comment',
    message: "David Chen commented on 'Building in Public'",
    time: '15m ago',
    read: false,
    link: { page: 'read', id: 'post2' },
    actor: { id: 'user2', name: 'David Chen', avatar: null },
    post: { id: 'post2', title: 'Building in Public' }
  },
  {
    id: 'n3',
    type: 'follow',
    message: 'Elena Kowalski started following you',
    time: '1h ago',
    read: false,
    link: { page: 'profile', id: 'user3' },
    actor: { id: 'user3', name: 'Elena Kowalski', avatar: null }
  }
]

// GET /api/notifications - Get user notifications
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    let filteredNotifications = notifications

    if (unreadOnly) {
      filteredNotifications = notifications.filter(n => !n.read)
    }

    const paginatedNotifications = filteredNotifications.slice(offset, offset + limit)

    return NextResponse.json(paginatedNotifications)
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}

// PUT /api/notifications - Mark notifications as read
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { notificationIds, markAll } = body

    if (markAll) {
      notifications = notifications.map(n => ({ ...n, read: true }))
    } else if (notificationIds && Array.isArray(notificationIds)) {
      notifications = notifications.map(n => 
        notificationIds.includes(n.id) ? { ...n, read: true } : n
      )
    } else {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating notifications:', error)
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 })
  }
}

// Helper functions
