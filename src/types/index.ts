

export interface Brand {
  id: string;
  name: string;
  description: string;
  industry: string;
  targetAudience: string;
  brandVoice: string;
  logoUrl?: string;
  brandColors: string[];
  attachments: BrandAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface BrandAttachment {
  id: string;
  name: string;
  type: "image" | "document" | "video" | "audio";
  url: string;
  size: number;
  uploadedAt: string;
}

export interface ContentPlatform {
  id: string;
  name: string;
  type:
    | "instagram"
    | "facebook"
    | "twitter"
    | "linkedin"
    | "tiktok"
    | "youtube"
    | "blog";
  icon: string;
  connected: boolean;
  config?: Record<string, any>;
}

export interface ContentPlan {
  id: string;
  brandId: string;
  title: string;
  description: string;
  month: string;
  year: number;
  platforms: string[];
  status: "draft" | "generating" | "review" | "approved" | "published";
  totalPosts: number;
  generatedPosts: number;
  approvedPosts: number;
  scheduledPosts: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContentItem {
  id: string;
  planId: string;
  platform: string;
  type: "post" | "story" | "reel" | "video" | "article" | "carousel";
  title: string;
  content: string;
  media: MediaItem[];
  hashtags: string[];
  scheduledDate: string;
  status:
    | "draft"
    | "pending_review"
    | "approved"
    | "scheduled"
    | "published"
    | "failed";
  analytics?: ContentAnalytics;
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  type: "image" | "video" | "gif";
  url: string;
  thumbnail?: string;
  duration?: number;
  size: number;
  altText?: string;
}

export interface ContentAnalytics {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  clicks: number;
  reach: number;
  impressions: number;
  engagementRate: number;
  ctr: number;
}

export interface GenerationRequest {
  id: string;
  brandId: string;
  platforms: string[];
  duration: "1_week" | "2_weeks" | "1_month" | "3_months";
  contentTypes: string[];
  tone: string;
  topics: string[];
  additionalPrompts: string;
  attachments: string[];
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  createdAt: string;
}

export interface AnalyticsSummary {
  period: string;
  totalPosts: number;
  totalViews: number;
  totalEngagement: number;
  avgEngagementRate: number;
  topPerformingPost: string;
  platformBreakdown: Record<
    string,
    {
      posts: number;
      views: number;
      engagement: number;
    }
  >;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
  stage?: string;
  stepperSteps?: import("@/components/ui/vertical-stepper").StepperStep[];
}

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
}

// Blog-related types
export interface BlogPost {
  id: string;
  title: string;
  urlSlug?: string;
  content: string;
  summary: string;
  featuredImage: string;
  readingTime?: string; // in minutes
  author: {
    id: string;
    firstName: string;
    lastName: string;
    bio?: string;
  };
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  tags: string[];
  category: string;
  isFeatured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  analytics?: {
    views: number;
    shares: number;
    likes: number;
    comments: number;
  };
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  totalViews: number;
  totalShares: number;
  avgEngagement: number;
}


// User and Authentication Types
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: "admin" | "editor" | "viewer";
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Content Types
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: "draft" | "published" | "scheduled";
  platform: string[];
  keywords: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  media: MediaFile[];
  seoTitle?: string;
  seoDescription?: string;
  views: number;
  shares: number;
}



export interface SocialPost {
  id: string;
  platform:
    | "twitter"
    | "instagram"
    | "youtube"
    | "linkedin"
    | "facebook"
    | "tiktok";
  content: string;
  media: MediaFile[];
  status: "draft" | "scheduled" | "published";
  scheduledAt?: string;
  publishedAt?: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
  };
}

// File and Media Types
export interface MediaFile {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "csv";
  url: string;
  size: number;
  uploadedAt: string;
  thumbnailUrl?: string;
  folder?: string;
}

export interface UploadFile {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  error?: string;
}

export interface FileFolder {
  id: string;
  name: string;
  path: string;
  parentId?: string;
  createdAt: string;
  files: MediaFile[];
  subfolders: FileFolder[];
}

// Calendar Types
export interface CalendarEvent {
  id: string;
  title: string;
  type: "article" | "social_post" | "meeting" | "deadline";
  date: string;
  time?: string;
  description?: string;
  relatedContent?: {
    id: string;
    type: "article" | "blog_post" | "social_post";
  };
}

// Analytics Types
export interface AnalyticsData {
  period: "day" | "week" | "month" | "year";
  metrics: {
    views: number;
    shares: number;
    likes: number;
    comments: number;
    conversions: number;
    revenue: number;
  };
  platformBreakdown: {
    platform: string;
    metrics: {
      views: number;
      engagement: number;
      conversions: number;
      totalGenerated: number;
      totalPublished: number;
      clicks: number;
      engagementRate: number;
    };
  }[];
  timeSeriesData: {
    date: string;
    views: number;
    engagement: number;
    conversions: number;
  }[];
}

// Dashboard Types
export interface DashboardStats {
  articlesThisMonth: number;
  socialPostsScheduled: number;
  totalViews: number;
  totalEngagement: number;
  recentArticles: Article[];
  upcomingPosts: SocialPost[];
}

// Chat Types
export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "bot";
  type: "text" | "image" | "file";
}

export interface ChatConversation {
  id: string;
  visitorId: string;
  visitorName?: string;
  startedAt: string;
  endedAt?: string;
  status: "active" | "ended";
  messages: ChatMessage[];
  messageCount: number;
  tags: string[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter and Search Types
export interface ArticleFilters {
  platform?: string[];
  status?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  author?: string;
  keywords?: string[];
}

export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: "asc" | "desc";
  };
  page?: number;
  limit?: number;
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "select"
    | "checkbox"
    | "file";
  placeholder?: string;
  required?: boolean;
  validation?: any;
  options?: { label: string; value: string }[];
}
