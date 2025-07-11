import {
  User,
  LoginCredentials,
  SignupData,
  Article,
  SocialPost,
  DashboardStats,
  MediaFile,
  ChatConversation,
  AnalyticsData,
  BlogPost,
  CalendarEvent,
  ApiResponse,
  PaginatedResponse,
  ArticleFilters,
  SearchParams,
} from "@/types";

import {
  mockUsers,
  mockArticles,
  mockSocialPosts,
  mockBlogPosts,
  mockMediaFiles,
  mockChatConversations,
  mockAnalyticsData,
  mockDashboardStats,
  mockCalendarEvents,
} from "./mockData";

// Simulate API delay
const delay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));



// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await delay();
    return {
      success: true,
      message: "Dashboard stats retrieved successfully",
      data: mockDashboardStats,
    };
  },
};

// Articles API
export const articlesApi = {
  getAll: async (
    filters?: ArticleFilters,
  ): Promise<PaginatedResponse<Article>> => {
    await delay();
    let filteredArticles = [...mockArticles];

    if (filters?.status?.length) {
      filteredArticles = filteredArticles.filter((article) =>
        filters.status!.includes(article.status),
      );
    }

    if (filters?.platform?.length) {
      filteredArticles = filteredArticles.filter((article) =>
        article.platform.some((p) => filters.platform!.includes(p)),
      );
    }

    return {
      data: filteredArticles,
      pagination: {
        page: 1,
        limit: 10,
        total: filteredArticles.length,
        totalPages: Math.ceil(filteredArticles.length / 10),
      },
    };
  },

  getById: async (id: string): Promise<ApiResponse<Article>> => {
    await delay();
    const article = mockArticles.find((a) => a.id === id);
    if (!article) {
      throw new Error("Article not found");
    }
    return {
      success: true,
      message: "Article retrieved successfully",
      data: article,
    };
  },

  create: async (
    articleData: Partial<Article>,
  ): Promise<ApiResponse<Article>> => {
    await delay();
    const newArticle: Article = {
      id: (mockArticles.length + 1).toString(),
      title: articleData.title || "",
      content: articleData.content || "",
      excerpt: articleData.excerpt || "",
      status: articleData.status || "draft",
      platform: articleData.platform || [],
      keywords: articleData.keywords || [],
      author: articleData.author || "Current User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      media: articleData.media || [],
      views: 0,
      shares: 0,
    };

    return {
      success: true,
      message: "Article created successfully",
      data: newArticle,
    };
  },

  update: async (
    id: string,
    articleData: Partial<Article>,
  ): Promise<ApiResponse<Article>> => {
    await delay();
    const article = mockArticles.find((a) => a.id === id);
    if (!article) {
      throw new Error("Article not found");
    }

    const updatedArticle: Article = {
      ...article,
      ...articleData,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      message: "Article updated successfully",
      data: updatedArticle,
    };
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    await delay();
    const index = mockArticles.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error("Article not found");
    }

    return {
      success: true,
      message: "Article deleted successfully",
      data: null,
    };
  },
};

// Social Media API
export const socialApi = {
  getAll: async (): Promise<PaginatedResponse<SocialPost>> => {
    await delay();
    return {
      data: mockSocialPosts,
      pagination: {
        page: 1,
        limit: 10,
        total: mockSocialPosts.length,
        totalPages: Math.ceil(mockSocialPosts.length / 10),
      },
    };
  },

  getByPlatform: async (
    platform: string,
  ): Promise<ApiResponse<SocialPost[]>> => {
    await delay();
    const posts = mockSocialPosts.filter((post) => post.platform === platform);
    return {
      success: true,
      message: "Platform posts retrieved successfully",
      data: posts,
    };
  },

  create: async (
    postData: Partial<SocialPost>,
  ): Promise<ApiResponse<SocialPost>> => {
    await delay();
    const newPost: SocialPost = {
      id: (mockSocialPosts.length + 1).toString(),
      platform: postData.platform || "twitter",
      content: postData.content || "",
      media: postData.media || [],
      status: postData.status || "draft",
      engagement: {
        likes: 0,
        shares: 0,
        comments: 0,
        views: 0,
      },
    };

    return {
      success: true,
      message: "Social post created successfully",
      data: newPost,
    };
  },
};

// File Management API
export const filesApi = {
  getAll: async (): Promise<ApiResponse<MediaFile[]>> => {
    await delay();
    return {
      success: true,
      message: "Files retrieved successfully",
      data: mockMediaFiles,
    };
  },

  upload: async (files: File[]): Promise<ApiResponse<MediaFile[]>> => {
    await delay(2000); // Simulate longer upload time

    const uploadedFiles: MediaFile[] = files.map((file, index) => ({
      id: (mockMediaFiles.length + index + 1).toString(),
      name: file.name,
      type: file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("video/")
          ? "video"
          : "document",
      url: URL.createObjectURL(file),
      size: file.size,
      uploadedAt: new Date().toISOString(),
      thumbnailUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));

    return {
      success: true,
      message: "Files uploaded successfully",
      data: uploadedFiles,
    };
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    await delay();
    return {
      success: true,
      message: "File deleted successfully",
      data: null,
    };
  },
};

// Analytics API
export const analyticsApi = {
  getOverview: async (
    period: "day" | "week" | "month" | "year" = "month",
  ): Promise<ApiResponse<AnalyticsData>> => {
    await delay();
    return {
      success: true,
      message: "Analytics data retrieved successfully",
      data: { ...mockAnalyticsData, period },
    };
  },
};





// Chat API
export const chatApi = {
  getConversations: async (): Promise<PaginatedResponse<ChatConversation>> => {
    await delay();
    return {
      data: mockChatConversations,
      pagination: {
        page: 1,
        limit: 10,
        total: mockChatConversations.length,
        totalPages: Math.ceil(mockChatConversations.length / 10),
      },
    };
  },

  getConversation: async (
    id: string,
  ): Promise<ApiResponse<ChatConversation>> => {
    await delay();
    const conversation = mockChatConversations.find((c) => c.id === id);
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    return {
      success: true,
      message: "Conversation retrieved successfully",
      data: conversation,
    };
  },
};
