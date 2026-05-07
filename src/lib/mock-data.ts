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
    coverImage: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
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
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
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
    coverImage: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
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
    coverImage: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
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
    coverImage: 'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
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
    coverImage: 'https://images.pexels.com/photos/1024989/pexels-photo-1024989.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
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
    coverImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
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
    coverImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
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
    coverImage: 'https://images.pexels.com/photos/1108571/pexels-photo-1108571.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
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
    coverImage: 'https://images.pexels.com/photos/4065145/pexels-photo-4065145.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
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
    coverImage: 'https://picsum.photos/800/500?random=6',
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
    coverImage: 'https://images.pexels.com/photos/956981/pexels-photo-956981.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    readTime: 5,
    likes: 445,
    createdAt: '2025-02-25',
    status: 'published',
  },
  {
    id: '13',
    title: 'The Architecture of Silence: Finding Space in a Noisy World',
    excerpt: 'In cities that never sleep and minds that never rest, silence has become the ultimate luxury. Here\'s how to build it into your life.',
    content: `<p>We live in the age of noise. Not just sound — notifications, opinions, expectations, the constant hum of productivity. Silence isn't just absence of noise anymore. It's an act of rebellion.</p>

<h2>The Sound of Nothing</h2>

<p>I spent a week in a remote cabin with no internet, no phone reception. The first day was anxiety. The second was boredom. By day three, something shifted. I started hearing things — the wind, my own breathing, the space between thoughts. Silence wasn't empty. It was full.</p>

<blockquote>In a world that values expression, the most revolutionary act is listening.</blockquote>

<h2>Building Quiet Spaces</h2>

<p>You don't need a cabin to find silence. You can create it in small pockets. A morning without screens. A walk without headphones. A room where notifications are banned. These aren't escapes from reality — they're returns to it.</p>

<p>Silence is where you hear yourself again. And in that hearing, everything else becomes clearer.</p>`,
    author: authors[0],
    authorId: 'user-1',
    category: 'Lifestyle',
    tags: ['Silence', 'Mindfulness', 'Digital Detox'],
    coverImage: 'https://images.pexels.com/photos/1108571/pexels-photo-1108571.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    readTime: 6,
    likes: 387,
    createdAt: '2025-03-01',
    featured: true,
    status: 'published',
  },
  {
    id: '14',
    title: 'The Economics of Attention: Why Your Focus Is Worth Billions',
    excerpt: 'Every app, every platform, every notification is competing for the same scarce resource. Understanding the attention economy changes everything about how you spend your time.',
    content: `<p>Your attention is the most valuable commodity on Earth, and you're giving it away for free. The attention economy isn't metaphor — it's the business model of the modern internet.</p>

<h2>The Attention Auction</h2>

<p>Every time you open your phone, there's an auction happening. Instagram bids with dopamine. Twitter bids with outrage. TikTok bids with endless novelty. You're the prize, and you didn't even know you were for sale.</p>

<h2>Reclaiming Your Mind</h2>

<p>The solution isn't better willpower. It's better architecture. Turn off notifications. Use apps intentionally instead of reactively. Schedule deep work sessions. Treat your attention like money — because that's exactly how tech companies treat it.</p>

<blockquote>You can't be present in your own life if you're always performing for an audience you can't see.</blockquote>

<p>The attention economy will keep expanding. The only way out is to opt out, deliberately and consistently.</p>`,
    author: authors[1],
    authorId: 'user-2',
    category: 'Technology',
    tags: ['Attention Economy', 'Digital Wellness', 'Focus'],
    coverImage: 'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    readTime: 7,
    likes: 423,
    createdAt: '2025-03-05',
    featured: true,
    status: 'published',
  },
  {
    id: '15',
    title: 'Cooking as Resistance: The Politics of the Kitchen',
    excerpt: 'In a world of processed food and fast meals, choosing to cook is an act of defiance. It\'s about culture, health, and taking back control.',
    content: `<p>Every meal is a political act. What you eat, where it comes from, who profits — these aren't neutral choices. The kitchen has become a battleground between convenience and control.</p>

<h2>The Food Industrial Complex</h2>

<p>The modern food system wants you dependent. Ultra-processed foods designed for addiction rather than nutrition. Supply chains that value shelf life over flavor. Marketing that creates cravings rather than satisfies hunger. Cooking is resistance.</p>

<h2>Taking Back the Plate</h2>

<p>When you cook, you reclaim something fundamental. You decide what goes into your body. You support farmers instead of corporations. You preserve cultural knowledge instead of letting it die. You nourish instead of just feeding.</p>

<blockquote>Cooking isn't a chore. It's a declaration of independence from the industrial food system.</blockquote>

<p>Every home-cooked meal is a vote for a different kind of world — one where food is about life, not profit.</p>`,
    author: authors[3],
    authorId: 'user-4',
    category: 'Food',
    tags: ['Food Politics', 'Cooking', 'Sustainability'],
    coverImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    readTime: 8,
    likes: 512,
    createdAt: '2025-03-10',
    featured: true,
    status: 'published',
  },
  {
    id: '16',
    title: 'The End of Expertise: Why Generalists Win in the Age of AI',
    excerpt: 'Specialization used to be the path to success. But in a world where AI knows everything, the ability to connect ideas across fields is the real advantage.',
    content: `<p>For centuries, we've worshipped specialists. The person who knows one thing deeply. But AI has changed the game. It knows everything deeply, instantly. The human advantage has shifted.</p>

<h2>The Specialist's Dilemma</h2>

<p>When you compete against AI on its home turf — factual recall, pattern recognition, data analysis — you lose. The specialist who spent decades mastering one domain finds themselves competing with an entity that has mastered all domains.</p>

<h2>The Generalist Advantage</h2>

<p>But AI can't connect. It can't synthesize across fields in human ways. It can't spot the patterns that exist between disciplines. This is where humans shine — the ability to see what specialists miss because they're too close to their subject.</p>

<blockquote>In a world of infinite information, the scarce resource isn't knowledge — it's wisdom.</blockquote>

<p>The future belongs to those who can dance between fields, who can bring insights from one domain to solve problems in another. The generalist's time has come.</p>`,
    author: authors[4],
    authorId: 'user-5',
    category: 'Science',
    tags: ['AI', 'Future of Work', 'Interdisciplinarity'],
    coverImage: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    readTime: 6,
    likes: 478,
    createdAt: '2025-03-15',
    featured: true,
    status: 'published',
  },
  {
    id: '17',
    title: 'Walking Cities: How Foot Travel Reveals Hidden Truths',
    excerpt: 'Cars show you the highways. Walking shows you the neighborhoods. At human speed, cities reveal their secrets and their souls.',
    content: `<p>I walked across my city. Not as a tourist, but as a pilgrim. Every street, every alley, every shortcut. What I discovered wasn't just geography — it was the hidden life of the place I thought I knew.</p>

<h2>The Speed of Seeing</h2>

<p>At walking speed, you notice things cars hide. The way morning light hits different buildings. The patterns of foot traffic that tell you where people really go. The small businesses that survive despite being invisible from main roads.</p>

<h2>Urban Archaeology</h2>

<p>Walking is urban archaeology. You find traces of the past — old streetcar tracks, forgotten plaques, buildings that remember different eras. You see the layers of how the city grew, not just its current state.</p>

<blockquote>Cities aren't meant to be driven through. They're meant to be discovered on foot.</blockquote>

<p>The best way to understand any place is to slow down to human speed and let it reveal itself.</p>`,
    author: authors[2],
    authorId: 'user-3',
    category: 'Travel',
    tags: ['Urban Exploration', 'Walking', 'City Life'],
    coverImage: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    readTime: 5,
    likes: 334,
    createdAt: '2025-03-20',
    featured: true,
    status: 'published',
  },
  {
    id: '18',
    title: 'The Mathematics of Kindness: Why Nice Guys Don\'t Finish Last',
    excerpt: 'Game theory and evolutionary biology reveal something surprising: cooperation, not competition, is often the winning strategy in the long run.',
    content: `<p>"Nice guys finish last" is one of those phrases that sounds wise but falls apart under scrutiny. The math of human interaction tells a different story.</p>

<h2>Game Theory of Cooperation</h2>

<p>In repeated games, the most successful strategy isn't always aggression. It's often "tit for tat" — start cooperative, mirror your opponent, but be quick to forgive. This strategy dominates in computer tournaments and in human societies.</p>

<h2>The Evolutionary Advantage</h2>

<p>Humans survived because we cooperated. We shared food, cared for each other's children, built together. The lone wolf died. The tribe thrived. Kindness isn't weakness — it's the original survival strategy.</p>

<blockquote>The most competitive move in the long game is often the most cooperative one in the short game.</blockquote>

<p>Being kind isn't about being nice. It's about being smart enough to recognize that we rise together.</p>`,
    author: authors[5],
    authorId: 'user-6',
    category: 'Science',
    tags: ['Game Theory', 'Evolution', 'Cooperation'],
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    readTime: 7,
    likes: 445,
    createdAt: '2025-03-25',
    featured: true,
    status: 'published',
  },
  {
    id: '19',
    title: 'The Loneliness Epidemic: Why We\'re More Connected Than Ever',
    excerpt: 'Social media promised connection but delivered performance. The paradox of modern life is unprecedented digital connection alongside profound social isolation.',
    content: `<p>We have hundreds of Facebook friends but no one to call at 2 AM. We post photos of perfect lives while feeling perfectly miserable. Something has gone terribly wrong with how we connect.</p>

<h2>The Performance of Connection</h2>

<p>Social media turned relationships into content. We don't share experiences — we curate them. We don't have conversations — we post monologues. We don't build intimacy — we accumulate likes.</p>

<h2>The Cost of Curation</h2>

<p>When every interaction is performed, authenticity dies. We become afraid to show vulnerability, to admit struggle, to be human. The result is a world of beautiful, perfect, and utterly lonely people.</p>

<blockquote>True connection requires the courage to be imperfect in front of others.</blockquote>

<p>The solution isn't better technology. It's braver humanity — showing up as we are, not as we think we should be.</p>`,
    author: authors[6],
    authorId: 'user-7',
    category: 'Health',
    tags: ['Loneliness', 'Social Media', 'Mental Health'],
    coverImage: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    readTime: 6,
    likes: 589,
    createdAt: '2025-04-01',
    featured: true,
    status: 'published',
  },
  {
    id: '20',
    title: 'Writing as Thinking: How Putting Words Down Changes Your Mind',
    excerpt: 'The act of writing isn\'t just recording thoughts — it\'s creating them. Here\'s how the physical act of writing reshapes your thinking.',
    content: `<p>I used to think writing was about expressing ideas I already had. Then I discovered something remarkable: the act of writing generates the ideas. The pen doesn't just record — it discovers.</p>

<h2>Thinking on Paper</h2>

<p>Writing forces linear clarity. Your mind can jump between associations, but paper demands sequence. This constraint creates insight. You see connections you didn't know you had. You find gaps in your reasoning you couldn't spot while thinking.</p>

<h2>The Physicality of Thought</h2>

<p>There's something about the physical act — the feel of pen on paper, the rhythm of typing — that engages different parts of your brain. It's not just cognitive; it's embodied.</p>

<blockquote>You don't write what you think. You write to find out what you think.</blockquote>

<p>Writing isn't communication. It's thinking made visible. And in that visibility, thoughts become clearer, stronger, and more useful.</p>`,
    author: authors[7],
    authorId: 'user-8',
    category: 'Science',
    tags: ['Neuroscience', 'Learning', 'Growth'],
    coverImage: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    readTime: 8,
    likes: 367,
    createdAt: '2025-04-05',
    featured: true,
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
