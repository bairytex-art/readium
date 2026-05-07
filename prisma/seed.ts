import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seeding...")

  // Seed users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "sarah@readium.com" },
      update: {},
      create: {
        name: "Sarah Mitchell",
        email: "sarah@readium.com",
        passwordHash: await hash("demo123", 12),
        avatar: "SM",
        bio: "Travel writer & photographer. Exploring the world one story at a time.",
        role: "user",
      },
    }),
    prisma.user.upsert({
      where: { email: "david@readium.com" },
      update: {},
      create: {
        name: "David Chen",
        email: "david@readium.com",
        passwordHash: await hash("demo123", 12),
        avatar: "DC",
        bio: "Tech enthusiast and startup advisor. Writing about the future of innovation.",
        role: "user",
      },
    }),
    prisma.user.upsert({
      where: { email: "amara@readium.com" },
      update: {},
      create: {
        name: "Amara Okafor",
        email: "amara@readium.com",
        passwordHash: await hash("demo123", 12),
        avatar: "AO",
        bio: "Cultural commentator and essayist. Bridging perspectives through words.",
        role: "user",
      },
    }),
    prisma.user.upsert({
      where: { email: "james@readium.com" },
      update: {},
      create: {
        name: "James Rivera",
        email: "james@readium.com",
        passwordHash: await hash("demo123", 12),
        avatar: "JR",
        bio: "Chef turned food writer. Finding stories in every dish.",
        role: "user",
      },
    }),
    prisma.user.upsert({
      where: { email: "elena@readium.com" },
      update: {},
      create: {
        name: "Elena Kowalski",
        email: "elena@readium.com",
        passwordHash: await hash("demo123", 12),
        avatar: "EK",
        bio: "Neuroscientist by day, science writer by night. Making complex ideas accessible.",
        role: "user",
      },
    }),
    prisma.user.upsert({
      where: { email: "marcus@readium.com" },
      update: {},
      create: {
        name: "Marcus Thompson",
        email: "marcus@readium.com",
        passwordHash: await hash("demo123", 12),
        avatar: "MT",
        bio: "Business strategist and mentor. Sharing lessons from two decades of leadership.",
        role: "user",
      },
    }),
    prisma.user.upsert({
      where: { email: "priya@readium.com" },
      update: {},
      create: {
        name: "Priya Sharma",
        email: "priya@readium.com",
        passwordHash: await hash("demo123", 12),
        avatar: "PS",
        bio: "Mindfulness practitioner and wellness blogger. Finding peace in everyday moments.",
        role: "user",
      },
    }),
    prisma.user.upsert({
      where: { email: "lucas@readium.com" },
      update: {},
      create: {
        name: "Lucas Andersen",
        email: "lucas@readium.com",
        passwordHash: await hash("demo123", 12),
        avatar: "LA",
        bio: "Digital nomad and lifestyle designer. Living life on my own terms.",
        role: "user",
      },
    }),
  ])

  console.log(`✅ Created ${users.length} users`)

  // Get user IDs for mapping
  const userMap = new Map()
  users.forEach((user, index) => {
    const emails = [
      "sarah@readium.com", "david@readium.com", "amara@readium.com", "james@readium.com",
      "elena@readium.com", "marcus@readium.com", "priya@readium.com", "lucas@readium.com"
    ]
    userMap.set(`user-${index + 1}`, user.id)
  })

  // Seed posts
  const postsData = [
    {
      title: "The Art of Slow Travel: Why Less Is More",
      excerpt: "In a world obsessed with ticking off destinations, I discovered that staying longer in fewer places transformed not just my trips, but my entire perspective on life.",
      content: `<p>We live in an era of bucket lists and passport stamps. The pressure to see everything, do everything, and post about it has turned travel into a competitive sport. But what if real magic lies in doing less?</p>

<h2>My Turning Point</h2>

<p>Three years ago, I found myself in Lisbon for what was supposed to be a two-day stopover. On the morning I was meant to leave, I walked into a tiny pastelaria in Alfama district. The owner, an elderly woman named Maria, handed me a pastel de nata and said something in Portuguese that I didn't understand. But her smile was universal. I stayed for a week.</p>

<blockquote>The best journeys are the ones that weren't planned. They find you when you finally stop running.</blockquote>

<h2>The Slow Travel Philosophy</h2>

<p>Slow travel isn't about being lazy — it's about being intentional. It's choosing one neighborhood over an entire city, one museum over a marathon of monuments, one conversation over a hundred photographs.</p>

<p>When you slow down, you notice things. The way light falls differently on cobblestones at 4 PM. The rhythm of a local market that follows the seasons, not the tourist calendar. The stories that only emerge when you're still long enough to hear them.</p>

<h2>Practical Steps</h2>

<p>Start small. Instead of country-hopping, pick one region. Rent an apartment instead of hotel-hopping. Shop at local markets. Learn ten words in the local language. Eat where locals eat. Walk without a map.</p>

<p>The world doesn't need another rushed itinerary. It needs more people willing to truly arrive.</p>`,
      authorId: userMap.get("user-1"),
      category: "Travel",
      tags: ["Travel", "Slow Living", "Mindfulness"],
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
      readTime: 6,
      featured: true,
      status: "published",
    },
    {
      title: "Building in Public: The Startup Strategy Nobody Talks About",
      excerpt: "Transparency isn't just a buzzword — it's a competitive advantage. Here's how sharing your journey can build an audience before you even launch.",
      content: `<p>The traditional playbook says: build in secret, perfect your product, then launch with a splash. But in a world drowning in polished marketing, authenticity has become the ultimate differentiator.</p>

<h2>Why Build in Public?</h2>

<p>When I started sharing my startup journey on social media — wins, failures, embarrassing mistakes — something unexpected happened. People didn't just follow along. They became invested. They offered help, made introductions, and became my first customers.</p>

<h2>The Vulnerability Advantage</h2>

<p>Building in public requires vulnerability. You're showing your work when it's imperfect. You're admitting when things go wrong. But this vulnerability creates something that no marketing budget can buy: trust.</p>

<blockquote>People don't buy products. They buy stories. And the most compelling story is the one they watched unfold in real time.</blockquote>

<p>In a landscape where consumers are increasingly skeptical of corporate messaging, the raw and unfiltered journey of a builder resonates on a fundamentally human level.</p>

<h2>Getting Started</h2>

<p>You don't need a massive following. Start by sharing your goals publicly. Document your progress weekly. Celebrate small wins. Be honest about setbacks. Ask for help when you need it. The community will surprise you.</p>`,
      authorId: userMap.get("user-2"),
      category: "Business",
      tags: ["Startup", "Transparency", "Marketing"],
      coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
      readTime: 5,
      featured: true,
      status: "published",
    },
    {
      title: "The Language of Food: How Dishes Tell Stories",
      excerpt: "Every plate is a narrative. From my grandmother's kitchen in Mexico City to street vendors in Bangkok, food carries the weight of culture, history, and identity.",
      content: `<p>I used to think cooking was about following recipes. Then I spent a summer in my grandmother's kitchen in Mexico City, and she taught me that every dish is a conversation — with the land, with history, with the people you love.</p>

<h2>More Than Sustenance</h2>

<p>Food is never just food. A bowl of pho tells the story of Vietnamese resilience. A plate of pasta carries generations of Italian nonnas. The spice blend in a Jamaican jerk chicken speaks of trade routes and cultural fusion.</p>

<blockquote>When you cook someone's traditional dish, you're not just making a meal. You're reading their story.</blockquote>

<h2>The Grandmother Principle</h2>

<p>My grandmother never wrote down a recipe. "You feel it," she'd say, adjusting the heat, adding a pinch of this, a handful of that. Cooking by intuition is cooking by experience — and experience can't be transcribed.</p>

<p>This is why the best food in any city is rarely found in fine-dining restaurants. It's found in homes, in street stalls, in places where cooking is an act of love rather than performance.</p>

<h2>A Global Kitchen</h2>

<p>I've been collecting stories through food for over a decade now. Each recipe I learn is a passport to understanding a culture from the inside out. The kitchen, I've discovered, is the most honest room in any house.</p>`,
      authorId: userMap.get("user-4"),
      category: "Food",
      tags: ["Food", "Culture", "Stories"],
      coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop",
      readTime: 7,
      featured: true,
      status: "published",
    },
  ]

  const posts = await Promise.all(
    postsData.map(async (postData) => {
      const { tags, ...postWithoutTags } = postData
      return prisma.post.create({
        data: {
          ...postWithoutTags,
          publishedAt: new Date(),
          tags: {
            create: tags.map((name: string) => ({ name })),
          },
        },
      })
    })
  )

  console.log(`✅ Created ${posts.length} posts`)

  // Seed comments
  const commentsData = [
    {
      content: "This resonated with me so deeply. I had a similar experience last year and it completely changed how I approach travel. Thank you for putting this into words.",
      authorId: userMap.get("user-2"),
      postId: posts[0].id,
    },
    {
      content: "Beautiful writing. The line about 'the best journeys are the ones that weren't planned' is going to stay with me for a long time.",
      authorId: userMap.get("user-3"),
      postId: posts[0].id,
    },
    {
      content: "Building in public changed my startup too. The vulnerability is scary at first, but the trust it creates is invaluable.",
      authorId: userMap.get("user-6"),
      postId: posts[1].id,
    },
    {
      content: "Your grandmother sounds like an incredible woman. Food really is the most universal language.",
      authorId: userMap.get("user-1"),
      postId: posts[2].id,
    },
  ]

  const comments = await Promise.all(
    commentsData.map((commentData) =>
      prisma.comment.create({ data: commentData })
    )
  )

  console.log(`✅ Created ${comments.length} comments`)

  // Seed some likes
  const likesData: { userId: string; postId: string }[] = []
  posts.forEach((post, postIndex) => {
    // Add 2-5 likes per post from different users
    const likeCount = Math.floor(Math.random() * 4) + 2
    for (let i = 0; i < likeCount; i++) {
      const userId = userMap.get(`user-${((i + 1) % 8) + 1}`)
      if (userId && userId !== post.authorId) {
        likesData.push({
          userId,
          postId: post.id,
        })
      }
    }
  })

  const likes = await Promise.all(
    likesData.map((likeData) => prisma.like.create({ data: likeData }))
  )

  console.log(`✅ Created ${likes.length} likes`)

  // Seed some bookmarks
  const bookmarksData: { userId: string; postId: string }[] = []
  posts.forEach((post, postIndex) => {
    // Add 1-3 bookmarks per post
    const bookmarkCount = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < bookmarkCount; i++) {
      const userId = userMap.get(`user-${((i + 2) % 8) + 1}`)
      if (userId && userId !== post.authorId) {
        bookmarksData.push({
          userId,
          postId: post.id,
        })
      }
    }
  })

  const bookmarks = await Promise.all(
    bookmarksData.map((bookmarkData) =>
      prisma.bookmark.create({ data: bookmarkData })
    )
  )

  console.log(`✅ Created ${bookmarks.length} bookmarks`)

  // Seed some follows
  const followsData: { followerId: string; followingId: string }[] = []
  const followPairs = new Set<string>()
  
  for (let i = 1; i <= 8; i++) {
    const followerId = userMap.get(`user-${i}`)
    // Each user follows 2-4 other users
    const followCount = Math.floor(Math.random() * 3) + 2
    for (let j = 0; j < followCount; j++) {
      const followingId = userMap.get(`user-${((i + j + 1) % 8) + 1}`)
      if (followingId && followerId !== followingId) {
        const pairKey = `${followerId}-${followingId}`
        if (!followPairs.has(pairKey)) {
          followsData.push({
            followerId,
            followingId,
          })
          followPairs.add(pairKey)
        }
      }
    }
  }

  const follows = await Promise.all(
    followsData.map((followData) => prisma.follow.create({ data: followData }))
  )

  console.log(`✅ Created ${follows.length} follows`)

  console.log("🎉 Database seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
