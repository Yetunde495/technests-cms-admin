import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Share2,
  TrendingUp,
  Users,
  Upload,
  Calendar,
  FolderOpen,
  MessageSquare,
  ArrowRight,
  Eye,
  Heart,
  BarChart3,
  Target,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import SummaryCard from "@/components/dashboard/SummaryCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import PostPerformance from "@/components/dashboard/PostPerformance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dashboardApi, analyticsApi } from "@/services/api";
import { DashboardStats, AnalyticsData } from "@/types";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, analyticsResponse] = await Promise.all([
          dashboardApi.getStats(),
          analyticsApi.getOverview("month"),
        ]);
        setStats(statsResponse.data);
        setAnalytics(analyticsResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-8 animate-pulse">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!stats) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load dashboard data</p>
        </div>
      </AppLayout>
    );
  }

  const quickActions = [
    {
      title: "Upload Content",
      description: "Upload documents, videos, and images",
      icon: Upload,
      href: "/upload",
      color: "brand" as const,
    },
    {
      title: "View Calendar",
      description: "Manage your content schedule",
      icon: Calendar,
      href: "/calendar",
      color: "success" as const,
    },
    {
      title: "Blog Manager",
      description: "Create and manage blog posts",
      icon: FolderOpen,
      href: "/blog",
      color: "info" as const,
    },
    {
      title: "Chat Conversations",
      description: "View customer conversations",
      icon: MessageSquare,
      href: "/chat",
      color: "warning" as const,
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">
              Welcome back, Alex 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your content today.
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
          >
            <Link to="/upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload Content
            </Link>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="Articles This Month"
            value={stats.articlesThisMonth}
            description="Content pieces generated"
            icon={<FileText className="h-4 w-4" />}
            trend={{
              value: 23,
              isPositive: true,
              period: "last month",
            }}
            color="brand"
          />
          <SummaryCard
            title="Social Posts Scheduled"
            value={stats.socialPostsScheduled}
            description="Ready to publish"
            icon={<Share2 className="h-4 w-4" />}
            trend={{
              value: 12,
              isPositive: true,
              period: "last week",
            }}
            color="success"
          />
          <SummaryCard
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            description="Across all platforms"
            icon={<Eye className="h-4 w-4" />}
            trend={{
              value: 8,
              isPositive: true,
              period: "last month",
            }}
            color="info"
          />
          <SummaryCard
            title="Engagement"
            value={stats.totalEngagement.toLocaleString()}
            description="Likes, shares, comments"
            icon={<Heart className="h-4 w-4" />}
            trend={{
              value: 15,
              isPositive: true,
              period: "last month",
            }}
            color="warning"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-display font-semibold mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.href}>
                <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          action.color === "brand"
                            ? "bg-brand-100 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                            : action.color === "success"
                              ? "bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400"
                              : action.color === "info"
                                ? "bg-info-50 text-info-600 dark:bg-info-900/20 dark:text-info-400"
                                : "bg-warning-50 text-warning-600 dark:bg-warning-900/20 dark:text-warning-400"
                        }`}
                      >
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-brand-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Analytics Section */}
        {analytics && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold">
                Analytics Overview
              </h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
                <span>Last 30 days</span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard
                title="Total Revenue"
                value={`$${analytics.metrics.revenue.toLocaleString()}`}
                description="from content conversions"
                icon={<Target className="h-4 w-4" />}
                trend={{
                  value: 12,
                  isPositive: true,
                  period: "last month",
                }}
                color="success"
              />
              <SummaryCard
                title="Conversion Rate"
                value={`${((analytics.metrics.conversions / analytics.metrics.views) * 100).toFixed(1)}%`}
                description="visitors to customers"
                icon={<TrendingUp className="h-4 w-4" />}
                trend={{
                  value: 5,
                  isPositive: true,
                  period: "last month",
                }}
                color="brand"
              />
              <SummaryCard
                title="Avg. Engagement"
                value={`${(((analytics.metrics.likes + analytics.metrics.shares + analytics.metrics.comments) / analytics.metrics.views) * 100).toFixed(1)}%`}
                description="engagement rate"
                icon={<Heart className="h-4 w-4" />}
                trend={{
                  value: 8,
                  isPositive: true,
                  period: "last month",
                }}
                color="warning"
              />
              <SummaryCard
                title="Active Users"
                value={`${Math.floor(analytics.metrics.views / 30).toLocaleString()}`}
                description="daily average users"
                icon={<Users className="h-4 w-4" />}
                trend={{
                  value: 15,
                  isPositive: true,
                  period: "last month",
                }}
                color="info"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnalyticsChart
                title="Performance Trends"
                data={analytics.timeSeriesData}
                type="line"
              />
              <AnalyticsChart
                title="Platform Breakdown"
                data={[]}
                platformData={analytics.platformBreakdown.map(
                  (platform, index) => ({
                    ...platform,
                    color: [
                      "rgb(139, 92, 246)",
                      "rgb(34, 197, 94)",
                      "rgb(245, 158, 11)",
                      "rgb(59, 130, 246)",
                    ][index % 4],
                  }),
                )}
                type="platform"
              />
            </div>

            {/* Post Performance */}
            <PostPerformance posts={stats.recentArticles} />
          </div>
        )}

        {/* Content Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Articles */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Articles</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/articles">
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-1">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant={
                          article.status === "published"
                            ? "default"
                            : article.status === "scheduled"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {article.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        by {article.author}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <Share2 className="h-3 w-3 mr-1" />
                        {article.shares}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Posts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Posts</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/social">
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.upcomingPosts.length > 0 ? (
                stats.upcomingPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {post.platform.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">
                        {post.platform.charAt(0).toUpperCase() +
                          post.platform.slice(1)}{" "}
                        Post
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {post.content}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {post.scheduledAt &&
                          new Date(post.scheduledAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {post.scheduledAt &&
                          new Date(post.scheduledAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No upcoming posts scheduled</p>
                  <Button variant="ghost" size="sm" className="mt-2" asChild>
                    <Link to="/social">Schedule a post</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
