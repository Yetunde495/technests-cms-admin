import {
  User,
  Article,
  SocialPost,
  DashboardStats,
  MediaFile,
  ChatConversation,
  AnalyticsData,
  BlogPost,
  CalendarEvent,
} from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@contentpro.com",
    name: "Alex Johnson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "admin",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    email: "editor@contentpro.com",
    name: "Sarah Chen",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612e7c1?w=100&h=100&fit=crop&crop=face",
    role: "editor",
    createdAt: "2024-02-01T10:00:00Z",
  },
];

// Mock Media Files
export const mockMediaFiles: MediaFile[] = [
  {
    id: "1",
    name: "hero-image.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=400&fit=crop",
    size: 245000,
    uploadedAt: "2024-03-01T10:00:00Z",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=200&h=100&fit=crop",
    folder: "marketing",
  },
  {
    id: "2",
    name: "product-demo.mp4",
    type: "video",
    url: "/videos/demo.mp4",
    size: 15600000,
    uploadedAt: "2024-03-02T14:30:00Z",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    folder: "videos",
  },
];

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Content Marketing in 2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt:
      "Discover the latest trends and strategies that will shape content marketing in 2024.",
    status: "published",
    platform: ["blog", "linkedin"],
    keywords: ["content marketing", "2024 trends", "digital strategy"],
    author: "Alex Johnson",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T12:00:00Z",
    publishedAt: "2024-03-01T14:00:00Z",
    media: [mockMediaFiles[0]],
    seoTitle: "Content Marketing Trends 2024 | Expert Insights",
    seoDescription:
      "Stay ahead with the latest content marketing trends for 2024. Expert strategies and actionable insights.",
    views: 1250,
    shares: 45,
  },
  {
    id: "2",
    title: "AI-Powered Content Generation: A Complete Guide",
    content:
      "Artificial intelligence is revolutionizing how we create and distribute content...",
    excerpt: "Learn how AI tools can streamline your content creation process.",
    status: "draft",
    platform: ["blog", "twitter", "linkedin"],
    keywords: ["AI", "content generation", "automation"],
    author: "Sarah Chen",
    createdAt: "2024-03-02T09:00:00Z",
    updatedAt: "2024-03-02T16:00:00Z",
    media: [],
    views: 0,
    shares: 0,
  },
  {
    id: "3",
    title: "Social Media ROI: Measuring Success in 2024",
    content:
      "Understanding and measuring return on investment for social media campaigns...",
    excerpt: "Master the metrics that matter for social media success.",
    status: "scheduled",
    platform: ["blog", "instagram", "facebook"],
    keywords: ["social media", "ROI", "analytics"],
    author: "Alex Johnson",
    createdAt: "2024-03-03T11:00:00Z",
    updatedAt: "2024-03-03T11:30:00Z",
    scheduledAt: "2024-03-10T09:00:00Z",
    media: [mockMediaFiles[1]],
    views: 0,
    shares: 0,
  },
];

// Mock Social Posts
export const mockSocialPosts: SocialPost[] = [
  {
    id: "1",
    platform: "twitter",
    content:
      "🚀 Just published our latest guide on content marketing trends for 2024! What trends are you most excited about? #ContentMarketing #2024Trends",
    media: [],
    status: "published",
    publishedAt: "2024-03-01T15:00:00Z",
    engagement: {
      likes: 124,
      shares: 23,
      comments: 8,
      views: 2540,
    },
  },
  {
    id: "2",
    platform: "instagram",
    content:
      "Behind the scenes of our content creation process ✨\n\n#ContentCreation #BehindTheScenes #ContentMarketing",
    media: [mockMediaFiles[0]],
    status: "scheduled",
    scheduledAt: "2024-03-05T10:00:00Z",
    engagement: {
      likes: 0,
      shares: 0,
      comments: 0,
      views: 0,
    },
  },
  {
    id: "3",
    platform: "linkedin",
    content:
      "AI is transforming content creation in unprecedented ways. Here are 5 key trends every marketer should know about...",
    media: [],
    status: "draft",
    engagement: {
      likes: 0,
      shares: 0,
      comments: 0,
      views: 0,
    },
  },
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Content Strategy",
    content:
      "A comprehensive guide to building your content strategy from the ground up...",
    excerpt: "Learn the fundamentals of content strategy.",
    status: "published",
    tags: ["strategy", "content", "marketing"],
    author: "Alex Johnson",
    createdAt: "2024-02-28T10:00:00Z",
    updatedAt: "2024-02-28T12:00:00Z",
    publishedAt: "2024-02-28T14:00:00Z",
    featuredImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    slug: "getting-started-content-strategy",
  },
  {
    id: "2",
    title: "SEO Best Practices for 2024",
    content: "The latest SEO strategies and techniques that actually work...",
    excerpt: "Stay current with SEO best practices.",
    status: "draft",
    tags: ["SEO", "optimization", "search"],
    author: "Sarah Chen",
    createdAt: "2024-03-01T09:00:00Z",
    updatedAt: "2024-03-01T15:00:00Z",
    featuredImage:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    slug: "seo-best-practices-2024",
  },
];

// Mock Calendar Events
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Publish AI Content Guide",
    type: "article",
    date: "2024-03-10",
    time: "09:00",
    description: "Scheduled publication of AI content generation guide",
    relatedContent: { id: "2", type: "article" },
  },
  {
    id: "2",
    title: "Instagram Post - BTS Content",
    type: "social_post",
    date: "2024-03-05",
    time: "10:00",
    description: "Behind the scenes content for Instagram",
    relatedContent: { id: "2", type: "social_post" },
  },
  {
    id: "3",
    title: "Content Team Meeting",
    type: "meeting",
    date: "2024-03-07",
    time: "14:00",
    description: "Weekly content planning meeting",
  },
];

// Mock Chat Conversations
export const mockChatConversations: ChatConversation[] = [
  {
    id: "1",
    visitorId: "visitor_001",
    visitorName: "John Smith",
    startedAt: "2024-03-01T14:30:00Z",
    endedAt: "2024-03-01T15:00:00Z",
    status: "ended",
    messageCount: 12,
    tags: ["support", "pricing"],
    messages: [
      {
        id: "1",
        content: "Hi! I have questions about your pricing plans.",
        timestamp: "2024-03-01T14:30:00Z",
        sender: "user",
        type: "text",
      },
      {
        id: "2",
        content:
          "Hello! I'd be happy to help you with pricing information. What specific plan are you interested in?",
        timestamp: "2024-03-01T14:31:00Z",
        sender: "bot",
        type: "text",
      },
      {
        id: "3",
        content: "I'm looking at the Pro plan. Does it include analytics?",
        timestamp: "2024-03-01T14:32:00Z",
        sender: "user",
        type: "text",
      },
      {
        id: "4",
        content:
          "Yes, the Pro plan includes comprehensive analytics dashboard with detailed insights on your content performance.",
        timestamp: "2024-03-01T14:33:00Z",
        sender: "bot",
        type: "text",
      },
    ],
  },
  {
    id: "2",
    visitorId: "visitor_002",
    visitorName: "Emma Wilson",
    startedAt: "2024-03-02T11:15:00Z",
    status: "active",
    messageCount: 5,
    tags: ["demo", "features"],
    messages: [
      {
        id: "1",
        content: "Can I schedule a demo?",
        timestamp: "2024-03-02T11:15:00Z",
        sender: "user",
        type: "text",
      },
      {
        id: "2",
        content:
          "Absolutely! I can help you schedule a personalized demo. What time works best for you?",
        timestamp: "2024-03-02T11:16:00Z",
        sender: "bot",
        type: "text",
      },
    ],
  },
];

// Mock Analytics Data
export const mockAnalyticsData: AnalyticsData = {
  period: "month",
  metrics: {
    views: 125440,
    shares: 3420,
    likes: 8900,
    comments: 1250,
    conversions: 340,
    revenue: 15600,
  },
  platformBreakdown: [
    {
      platform: "Blog",
      metrics: { views: 45000, engagement: 1200, conversions: 180 },
    },
    {
      platform: "Twitter",
      metrics: { views: 28000, engagement: 2100, conversions: 65 },
    },
    {
      platform: "LinkedIn",
      metrics: { views: 22000, engagement: 1800, conversions: 85 },
    },
    {
      platform: "Instagram",
      metrics: { views: 30440, engagement: 3800, conversions: 10 },
    },
  ],
  timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2024, 2, i + 1).toISOString().split("T")[0],
    views: Math.floor(Math.random() * 5000) + 2000,
    engagement: Math.floor(Math.random() * 300) + 100,
    conversions: Math.floor(Math.random() * 15) + 5,
  })),
};

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  articlesThisMonth: 8,
  socialPostsScheduled: 24,
  totalViews: 125440,
  totalEngagement: 13570,
  recentArticles: mockArticles.slice(0, 3),
  upcomingPosts: mockSocialPosts.filter((post) => post.status === "scheduled"),
};
