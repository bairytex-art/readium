export interface User {
  id: string
  name: string
  email: string
  password: string
  avatar: string // initials
  bio: string
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  authorId: string
  category: string
  tags: string[]
  coverImage: string
  readTime: number
  likes: number // base likes from mock data
  createdAt: string
  updatedAt?: string
  featured?: boolean
  status: 'published' | 'draft'
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  authorName: string
  authorAvatar: string
  content: string
  createdAt: string
}

export const categories = [
  'All',
  'Travel',
  'Technology',
  'Lifestyle',
  'Culture',
  'Health',
  'Food',
  'Science',
  'Business',
  'Art',
  'Personal Growth',
]

// Pre-seeded mock users (passwords are just for demo)
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Mitchell',
    email: 'sarah@readium.com',
    password: 'demo123',
    avatar: 'SM',
    bio: 'Travel writer & photographer. Exploring the world one story at a time.',
    createdAt: '2024-06-15',
  },
  {
    id: 'user-2',
    name: 'David Chen',
    email: 'david@readium.com',
    password: 'demo123',
    avatar: 'DC',
    bio: 'Tech enthusiast and startup advisor. Writing about the future of innovation.',
    createdAt: '2024-07-20',
  },
  {
    id: 'user-3',
    name: 'Amara Okafor',
    email: 'amara@readium.com',
    password: 'demo123',
    avatar: 'AO',
    bio: 'Cultural commentator and essayist. Bridging perspectives through words.',
    createdAt: '2024-08-10',
  },
  {
    id: 'user-4',
    name: 'James Rivera',
    email: 'james@readium.com',
    password: 'demo123',
    avatar: 'JR',
    bio: 'Chef turned food writer. Finding stories in every dish.',
    createdAt: '2024-09-05',
  },
  {
    id: 'user-5',
    name: 'Elena Kowalski',
    email: 'elena@readium.com',
    password: 'demo123',
    avatar: 'EK',
    bio: 'Neuroscientist by day, science writer by night. Making complex ideas accessible.',
    createdAt: '2024-10-12',
  },
  {
    id: 'user-6',
    name: 'Marcus Thompson',
    email: 'marcus@readium.com',
    password: 'demo123',
    avatar: 'MT',
    bio: 'Business strategist and mentor. Sharing lessons from two decades of leadership.',
    createdAt: '2024-11-01',
  },
  {
    id: 'user-7',
    name: 'Priya Sharma',
    email: 'priya@readium.com',
    password: 'demo123',
    avatar: 'PS',
    bio: 'Mindfulness practitioner and wellness blogger. Finding peace in everyday moments.',
    createdAt: '2024-11-15',
  },
  {
    id: 'user-8',
    name: 'Lucas Andersen',
    email: 'lucas@readium.com',
    password: 'demo123',
    avatar: 'LA',
    bio: 'Digital nomad and lifestyle designer. Living life on my own terms.',
    createdAt: '2024-12-01',
  },
]

const authors = [
  { name: 'Sarah Mitchell', avatar: 'SM', bio: 'Travel writer & photographer. Exploring the world one story at a time.' },
  { name: 'David Chen', avatar: 'DC', bio: 'Tech enthusiast and startup advisor. Writing about the future of innovation.' },
  { name: 'Amara Okafor', avatar: 'AO', bio: 'Cultural commentator and essayist. Bridging perspectives through words.' },
  { name: 'James Rivera', avatar: 'JR', bio: 'Chef turned food writer. Finding stories in every dish.' },
  { name: 'Elena Kowalski', avatar: 'EK', bio: 'Neuroscientist by day, science writer by night. Making complex ideas accessible.' },
  { name: 'Marcus Thompson', avatar: 'MT', bio: 'Business strategist and mentor. Sharing lessons from two decades of leadership.' },
  { name: 'Priya Sharma', avatar: 'PS', bio: 'Mindfulness practitioner and wellness blogger. Finding peace in everyday moments.' },
  { name: 'Lucas Andersen', avatar: 'LA', bio: 'Digital nomad and lifestyle designer. Living life on my own terms.' },
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Slow Travel: Why Less Is More',
    excerpt: 'In a world obsessed with ticking off destinations, I discovered that staying longer in fewer places transformed not just my trips, but my entire perspective on life.',
    content: `<p>We live in an era of bucket lists and passport stamps. The pressure to see everything, do everything, and post about it has turned travel into a competitive sport. But what if the real magic lies in doing less?</p>

<h2>My Turning Point</h2>

<p>Three years ago, I found myself in Lisbon for what was supposed to be a two-day stopover. On the morning I was meant to leave, I walked into a tiny pastelaria in the Alfama district. The owner, an elderly woman named Maria, handed me a pastel de nata and said something in Portuguese that I didn't understand. But her smile was universal. I stayed for a week.</p>

<blockquote>The best journeys are the ones that weren't planned. They find you when you finally stop running.</blockquote>

<h2>The Slow Travel Philosophy</h2>

<p>Slow travel isn't about being lazy — it's about being intentional. It's choosing one neighborhood over an entire city, one museum over a marathon of monuments, one conversation over a hundred photographs.</p>

<p>When you slow down, you notice things. The way light falls differently on cobblestones at 4 PM. The rhythm of a local market that follows the seasons, not the tourist calendar. The stories that only emerge when you're still long enough to hear them.</p>

<h2>Practical Steps</h2>

<p>Start small. Instead of country-hopping, pick one region. Rent an apartment instead of hotel-hopping. Shop at local markets. Learn ten words in the local language. Eat where the locals eat. Walk without a map.</p>

<p>The world doesn't need another rushed itinerary. It needs more people willing to truly arrive.</p>`,
    author: authors[0],
    authorId: 'user-1',
    category: 'Travel',
    tags: ['Travel', 'Slow Living', 'Mindfulness'],
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
    readTime: 6,
    likes: 342,
    createdAt: '2025-01-15',
    featured: true,
    status: 'published',
  },
  {
    id: '2',
    title: 'Building in Public: The Startup Strategy Nobody Talks About',
    excerpt: 'Transparency isn\'t just a buzzword — it\'s a competitive advantage. Here\'s how sharing your journey can build an audience before you even launch.',
    content: `<p>The traditional playbook says: build in secret, perfect your product, then launch with a splash. But in a world drowning in polished marketing, authenticity has become the ultimate differentiator.</p>

<h2>Why Build in Public?</h2>

<p>When I started sharing my startup journey on social media — the wins, the failures, the embarrassing mistakes — something unexpected happened. People didn't just follow along. They became invested. They offered help, made introductions, and became my first customers.</p>

<h2>The Vulnerability Advantage</h2>

<p>Building in public requires vulnerability. You're showing your work when it's imperfect. You're admitting when things go wrong. But this vulnerability creates something that no marketing budget can buy: trust.</p>

<blockquote>People don't buy products. They buy stories. And the most compelling story is the one they watched unfold in real time.</blockquote>

<p>In a landscape where consumers are increasingly skeptical of corporate messaging, the raw and unfiltered journey of a builder resonates on a fundamentally human level.</p>

<h2>Getting Started</h2>

<p>You don't need a massive following. Start by sharing your goals publicly. Document your progress weekly. Celebrate small wins. Be honest about setbacks. Ask for help when you need it. The community will surprise you.</p>`,
    author: authors[1],
    authorId: 'user-2',
    category: 'Business',
    tags: ['Startup', 'Transparency', 'Marketing'],
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
    readTime: 5,
    likes: 287,
    createdAt: '2025-02-03',
    featured: true,
    status: 'published',
  },
  {
    id: '3',
    title: 'The Language of Food: How Dishes Tell Stories',
    excerpt: 'Every plate is a narrative. From my grandmother\'s kitchen in Mexico City to street vendors in Bangkok, food carries the weight of culture, history, and identity.',
    content: `<p>I used to think cooking was about following recipes. Then I spent a summer in my grandmother's kitchen in Mexico City, and she taught me that every dish is a conversation — with the land, with history, with the people you love.</p>

<h2>More Than Sustenance</h2>

<p>Food is never just food. A bowl of pho tells the story of Vietnamese resilience. A plate of pasta carries generations of Italian nonnas. The spice blend in a Jamaican jerk chicken speaks of trade routes and cultural fusion.</p>

<blockquote>When you cook someone's traditional dish, you're not just making a meal. You're reading their story.</blockquote>

<h2>The Grandmother Principle</h2>

<p>My grandmother never wrote down a recipe. "You feel it," she'd say, adjusting the heat, adding a pinch of this, a handful of that. Cooking by intuition is cooking by experience — and experience can't be transcribed.</p>

<p>This is why the best food in any city is rarely found in fine-dining restaurants. It's found in homes, in street stalls, in places where cooking is an act of love rather than performance.</p>

<h2>A Global Kitchen</h2>

<p>I've been collecting stories through food for over a decade now. Each recipe I learn is a passport to understanding a culture from the inside out. The kitchen, I've discovered, is the most honest room in any house.</p>`,
    author: authors[3],
    authorId: 'user-4',
    category: 'Food',
    tags: ['Food', 'Culture', 'Stories'],
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
    readTime: 7,
    likes: 456,
    createdAt: '2025-01-28',
    featured: true,
    status: 'published',
  },
  {
    id: '4',
    title: 'Neuroplasticity: Your Brain\'s Greatest Superpower',
    excerpt: 'The science behind why it\'s never too late to change. How understanding neuroplasticity can transform the way you learn, grow, and overcome challenges.',
    content: `<p>For decades, we believed the brain was fixed after childhood — that our mental capacities were set in stone. Modern neuroscience has shattered this myth, revealing something far more remarkable: your brain can rewire itself at any age.</p>

<h2>What Is Neuroplasticity?</h2>

<p>Neuroplasticity is the brain's ability to form new neural connections throughout life. Every time you learn something new, practice a skill, or even change a thought pattern, you're literally reshaping your brain's physical structure.</p>

<h2>The Science of Change</h2>

<p>Research has shown that London taxi drivers develop larger hippocampi — the brain region associated with navigation — from memorizing the city's labyrinthine streets. Musicians have enhanced motor and auditory cortexes. Even meditation can increase gray matter density in areas related to attention and emotional regulation.</p>

<blockquote>Your brain is not a machine that wears out. It's a garden that grows with the right cultivation.</blockquote>

<h2>Practical Applications</h2>

<p>Understanding neuroplasticity changes everything. It means it's never too late to learn a language, master an instrument, or overcome anxiety. The key is consistent practice, adequate sleep, and a growth mindset. Your brain is always listening to what you ask it to do — so ask it to grow.</p>`,
    author: authors[4],
    authorId: 'user-5',
    category: 'Science',
    tags: ['Neuroscience', 'Learning', 'Growth'],
    coverImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop',
    readTime: 8,
    likes: 523,
    createdAt: '2025-02-10',
    featured: true,
    status: 'published',
  },
  {
    id: '5',
    title: 'Digital Minimalism: Reclaiming Your Attention',
    excerpt: 'In an age of infinite scrolling and notification fatigue, a growing movement is choosing to do less with technology — and finding more meaning as a result.',
    content: `<p>The average person checks their phone 96 times a day. We spend over two hours daily on social media. Our attention has become the most valuable commodity on Earth, and we're giving it away for free.</p>

<h2>The Cost of Constant Connection</h2>

<p>I used to be that person — the one who reached for their phone before opening their eyes in the morning. I had every app, every notification enabled, every feed refreshed. And I was exhausted.</p>

<p>Digital minimalism isn't about rejecting technology. It's about using it with intention. It's the difference between being a consumer of content and a curator of your digital life.</p>

<h2>My 30-Day Experiment</h2>

<p>I removed all social media apps from my phone. I set specific times for email. I replaced mindless scrolling with reading, journaling, and actual phone calls. The first week was withdrawal. The second week was clarity. By the third week, I felt like I'd gotten my mind back.</p>

<blockquote>The opposite of distraction isn't focus. It's intention.</blockquote>

<h2>Starting Your Own Practice</h2>

<p>Begin by auditing your digital life. Which apps genuinely serve you? Which ones merely consume you? Delete the rest. Set boundaries around when and how you engage with technology. Your attention is finite — treat it that way.</p>`,
    author: authors[7],
    authorId: 'user-8',
    category: 'Lifestyle',
    tags: ['Minimalism', 'Digital Wellness', 'Focus'],
    coverImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=500&fit=crop',
    readTime: 5,
    likes: 389,
    createdAt: '2025-02-18',
    status: 'published',
  },
  {
    id: '6',
    title: 'The Morning Routine Myth: Why One-Size-Fits-None',
    excerpt: 'Cold showers at 5 AM aren\'t the universal key to success. Here\'s why the best morning routine is the one that actually works for you.',
    content: `<p>Every productivity guru has a morning routine to sell you. Wake at 5 AM. Ice bath. Meditation. Journaling. Green smoothie. By the time you've completed the checklist, half the morning is gone and you're more stressed than when you started.</p>

<h2>The Problem with Prescribed Routines</h2>

<p>We're not all wired the same way. Some people are genuinely night owls — their creative peak hits at 10 PM, not 6 AM. Forcing yourself into someone else's optimal schedule ignores your own biology and psychology.</p>

<blockquote>A morning routine should serve your life, not the other way around.</blockquote>

<h2>Finding Your Rhythm</h2>

<p>Instead of copying what works for a CEO or a wellness influencer, experiment. Track your energy levels throughout the day for two weeks. Notice when you feel most creative, most analytical, most social. Then design your routine around your actual patterns, not aspirational ones.</p>

<p>The best routine is the one you'll actually do — consistently, sustainably, and with genuine benefit to your well-being.</p>`,
    author: authors[6],
    authorId: 'user-7',
    category: 'Health',
    tags: ['Wellness', 'Productivity', 'Self-Care'],
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop',
    readTime: 4,
    likes: 215,
    createdAt: '2025-01-22',
    status: 'published',
  },
  {
    id: '7',
    title: 'Between Two Worlds: Growing Up Between Cultures',
    excerpt: 'The experience of belonging everywhere and nowhere simultaneously. How third-culture kids navigate identity, community, and the beautiful complexity of multiple homelands.',
    content: `<p>I was born in Lagos, raised in London, and educated in Tokyo. When people ask where I'm from, I've learned to read the room. The short answer is complicated. The long answer is a story.</p>

<h2>The In-Between Space</h2>

<p>Third-culture kids — those who spend their formative years outside their parents' culture — exist in a unique space. You adapt to each environment, absorbing languages, customs, and worldviews like a sponge. But you also carry a quiet grief: the sense that no single place is fully yours.</p>

<blockquote>Home isn't a place. It's a feeling you chase across continents, finding it in fragments — a smell, a sound, a way someone laughs.</blockquote>

<h2>The Superpower</h2>

<p>But this in-betweenness is also a gift. You see the world through multiple lenses. You understand that "normal" is relative, that every culture has wisdom worth learning, and that identity isn't fixed — it's a conversation between who you are and where you find yourself.</p>

<p>To anyone navigating between worlds: you don't have to choose. You contain multitudes, and that's not a weakness. It's the most human thing of all.</p>`,
    author: authors[2],
    authorId: 'user-3',
    category: 'Culture',
    tags: ['Identity', 'Culture', 'Third Culture'],
    coverImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=500&fit=crop',
    readTime: 6,
    likes: 478,
    createdAt: '2025-02-05',
    status: 'published',
  },
  {
    id: '8',
    title: 'The Canvas and the Code: Where Art Meets Technology',
    excerpt: 'From generative art to AI-assisted design, the boundary between artist and algorithm is dissolving — and the results are reshaping creativity itself.',
    content: `<p>For centuries, artists have used the tools of their time — from the camera obscura to the synthesizer. Today's tool is code, and it's opening creative possibilities that were unimaginable even a decade ago.</p>

<h2>Generative Art: Creativity by Algorithm</h2>

<p>Generative art uses algorithms and rules to create visual works. The artist sets the parameters, introduces randomness, and lets the machine explore possibilities beyond human imagination. The result is art that's both systematic and surprising — structured chaos that mirrors nature itself.</p>

<h2>The Human Element</h2>

<p>But does the machine create, or does the artist? I believe it's both. The algorithm is a brush — an incredibly powerful brush, but still a brush. The vision, the emotion, the meaning — those come from the human who wields it.</p>

<blockquote>Technology doesn't replace creativity. It expands its borders, inviting us into territories we didn't know existed.</blockquote>

<p>The future of art isn't human versus machine. It's human and machine, creating together in ways that neither could achieve alone.</p>`,
    author: authors[2],
    authorId: 'user-3',
    category: 'Art',
    tags: ['Art', 'Technology', 'Creativity'],
    coverImage: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=500&fit=crop',
    readTime: 5,
    likes: 312,
    createdAt: '2025-01-10',
    status: 'published',
  },
  {
    id: '9',
    title: 'The Compound Effect of Small Habits',
    excerpt: 'The difference between who you are and who you want to be isn\'t a single dramatic change — it\'s a thousand tiny decisions, compounded over time.',
    content: `<p>We overestimate what we can achieve in a month and underestimate what we can achieve in a year. This isn't just a motivational platitude — it's a mathematical truth about the nature of compound growth.</p>

<h2>The Mathematics of Improvement</h2>

<p>If you get 1% better at something every day, after one year you'll be 37 times better. Not 365% better — 3,700% better. This is the power of compounding, and it applies to habits just as much as to investments.</p>

<h2>Why Most People Quit</h2>

<p>The problem with compounding is that it's invisible in the short term. Day 1 and Day 30 look almost identical. The results only become dramatic after months or years of consistency, and most people give up before the curve bends upward.</p>

<blockquote>Success isn't a sprint or a marathon. It's a quiet, daily practice that eventually becomes unmistakable.</blockquote>

<h2>Building Your System</h2>

<p>Don't focus on goals. Focus on systems. A goal says "I want to write a book." A system says "I write 500 words every morning." Goals are about results; systems are about process. And process, practiced consistently, is what produces results.</p>`,
    author: authors[5],
    authorId: 'user-6',
    category: 'Personal Growth',
    tags: ['Habits', 'Growth', 'Self-Improvement'],
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop',
    readTime: 6,
    likes: 567,
    createdAt: '2025-02-22',
    status: 'published',
  },
  {
    id: '10',
    title: 'Sourdough and Solitude: Lessons from a Year of Baking',
    excerpt: 'What started as a pandemic hobby became a meditation on patience, imperfection, and the quiet joy of making something with your hands.',
    content: `<p>My sourdough starter — named Doughstoyevsky by a friend — turned one last month. In that year, I've learned more about patience, failure, and the beauty of imperfection than in any self-help book I've ever read.</p>

<h2>The First Loaf</h2>

<p>It was a disaster. Flat, dense, and sour enough to make your eyes water. I followed the recipe exactly, but sourdough doesn't care about recipes. It cares about time, temperature, intuition, and a willingness to fail.</p>

<blockquote>Bread teaches you that you can't rush what needs time. And most things worth making need time.</blockquote>

<h2>The Practice of Presence</h2>

<p>Baking sourdough demands presence. You can't set it and forget it. You have to watch, feel, adjust. The dough tells you what it needs, but only if you're paying attention. In a world of automation and efficiency, there's something profoundly grounding about this kind of attentiveness.</p>

<p>Now, a year later, my loaves are far from perfect. But they're mine. Each one carries the story of that particular morning — the weather, my mood, the music playing in the kitchen. And that's exactly the point.</p>`,
    author: authors[3],
    authorId: 'user-4',
    category: 'Lifestyle',
    tags: ['Baking', 'Mindfulness', 'Slow Living'],
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=500&fit=crop',
    readTime: 5,
    likes: 298,
    createdAt: '2025-02-14',
    status: 'published',
  },
  {
    id: '11',
    title: 'The Future of Remote Work Is Not What You Think',
    excerpt: 'The debate between office and remote misses the point entirely. The real revolution is in how we define productivity, collaboration, and trust.',
    content: `<p>The remote work "debate" has become exhausting. One side insists offices are essential for culture. The other claims remote is the only future. Both are missing the point.</p>

<h2>Beyond Location</h2>

<p>The real question isn't where we work — it's how we work. For decades, we've conflated presence with productivity, hours with output, and proximity with collaboration. Remote work didn't break these assumptions; it exposed them.</p>

<blockquote>The office was never the solution. It was the default. And defaults, by definition, are rarely optimal.</blockquote>

<h2>What Actually Matters</h2>

<p>After leading distributed teams for five years, I've found that three things matter more than location: clear communication, genuine trust, and meaningful outcomes. Teams that master these thrive anywhere. Teams that don't struggle everywhere.</p>

<p>The future isn't remote or in-office. It's intentional — designing work around humans instead of the other way around.</p>`,
    author: authors[5],
    authorId: 'user-6',
    category: 'Business',
    tags: ['Remote Work', 'Future', 'Productivity'],
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    readTime: 5,
    likes: 234,
    createdAt: '2025-01-30',
    status: 'published',
  },
  {
    id: '12',
    title: 'Why I Stopped Optimizing My Life',
    excerpt: 'The self-improvement industry sold me a dream of perpetual upgrade. What I found instead was the radical freedom of being enough.',
    content: `<p>I tracked everything. Sleep scores, productivity metrics, heart rate variability, screen time, step count. My life was a dashboard, and I was the product trying to optimize itself into perfection.</p>

<h2>The Optimization Trap</h2>

<p>Self-improvement starts with good intentions — eat better, move more, learn faster. But somewhere along the way, it becomes a trap. You start seeing yourself as a project that needs fixing, a machine that needs tuning. Every moment becomes an opportunity for improvement, which means no moment is ever enough.</p>

<blockquote>The irony of optimization is that the more you optimize for happiness, the further it drifts from reach.</blockquote>

<h2>The Art of Enough</h2>

<p>One day, I stopped. Not all at once, but gradually. I deleted the tracking apps. I let myself have mornings without purpose. I ate food without logging it. I walked without counting steps. And something remarkable happened — I started actually living.</p>

<p>This isn't anti-improvement. It's pro-presence. There's a difference between growing and obsessing. One expands your life. The other contracts it.</p>`,
    author: authors[6],
    authorId: 'user-7',
    category: 'Personal Growth',
    tags: ['Self-Improvement', 'Mindfulness', 'Wellness'],
    coverImage: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=500&fit=crop',
    readTime: 5,
    likes: 445,
    createdAt: '2025-02-25',
    status: 'published',
  },
]

// Seed comments for first few posts
export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    postId: '1',
    authorId: 'user-2',
    authorName: 'David Chen',
    authorAvatar: 'DC',
    content: 'This resonated with me so deeply. I had a similar experience last year and it completely changed how I approach travel. Thank you for putting this into words.',
    createdAt: '2025-01-17',
  },
  {
    id: 'comment-2',
    postId: '1',
    authorId: 'user-3',
    authorName: 'Rina Tanaka',
    authorAvatar: 'RT',
    content: 'Beautiful writing. The line about "the best journeys are the ones that weren\'t planned" is going to stay with me for a long time.',
    createdAt: '2025-01-20',
  },
  {
    id: 'comment-3',
    postId: '2',
    authorId: 'user-6',
    authorName: 'Marcus Thompson',
    authorAvatar: 'MT',
    content: 'Building in public changed my startup too. The vulnerability is scary at first, but the trust it creates is invaluable.',
    createdAt: '2025-02-05',
  },
  {
    id: 'comment-4',
    postId: '3',
    authorId: 'user-1',
    authorName: 'Sarah Mitchell',
    authorAvatar: 'SM',
    content: 'Your grandmother sounds like an incredible woman. Food really is the most universal language.',
    createdAt: '2025-02-01',
  },
  {
    id: 'comment-5',
    postId: '4',
    authorId: 'user-7',
    authorName: 'Priya Sharma',
    authorAvatar: 'PS',
    content: 'This is fascinating! I\'ve been exploring neuroplasticity through meditation and the changes are real. Great science communication.',
    createdAt: '2025-02-12',
  },
  {
    id: 'comment-6',
    postId: '9',
    authorId: 'user-8',
    authorName: 'Lucas Andersen',
    authorAvatar: 'LA',
    content: 'The 1% compound effect changed my life. Small daily actions really do add up over time. Great article!',
    createdAt: '2025-02-24',
  },
]
