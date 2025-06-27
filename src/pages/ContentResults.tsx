import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Calendar,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  FileText,
  Image,
  Video,
  Heart,
  MessageCircle,
  Share,
  BarChart3,
  Clock,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContentGeneration } from "@/hooks/useContentGeneration";
import { useToasts } from "@/context/AppContext";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

// Sample generated content data
const generatedContent = {
  plan: {
    id: "plan-2024-jan",
    title: "January 2024 Trading Signals Content Plan",
    description:
      "Comprehensive social media strategy focusing on market analysis, trading education, and community engagement",
    totalPosts: 43,
    platforms: ["instagram", "twitter", "linkedin", "facebook"],
    generatedAt: new Date().toISOString(),
  },
  posts: [
    {
      id: "post-1",
      platform: "instagram",
      type: "post",
      status: "pending_review",
      title: "Market Opening Analysis - January 3rd",
      content:
        "🚀 MARKET OPENING BELL 🚀\n\n📊 Today's Focus: EUR/USD breaking resistance!\n\n✅ Key Levels:\n• Support: 1.0950\n• Resistance: 1.1050\n• Target: 1.1120\n\n💡 Strategy: Long position above 1.0980\n⚡ Risk Management: Stop at 1.0920\n\n#ForexTrading #TradingSignals #EUR_USD #MarketAnalysis #TradingCommunity #FinancialMarkets",
      media: [
        {
          type: "image",
          url: "/api/placeholder/800/600",
          thumbnail: "/api/placeholder/400/300",
          altText:
            "EUR/USD chart analysis showing key support and resistance levels",
        },
      ],
      hashtags: ["ForexTrading", "TradingSignals", "EUR_USD", "MarketAnalysis"],
      scheduledDate: "2024-01-03T09:00:00Z",
      performance: {
        estimated_reach: 2500,
        estimated_engagement: 180,
        optimal_time: "9:00 AM EST",
      },
    },
    {
      id: "post-2",
      platform: "twitter",
      type: "post",
      status: "pending_review",
      title: "Quick Trading Tip Thread",
      content:
        "🧵 THREAD: 5 Risk Management Rules Every Trader MUST Follow\n\n1/ Never risk more than 2% per trade\nYour account should survive 50 consecutive losses. This isn't pessimism—it's preparation.\n\n2/ Always use stop losses\nHope is not a strategy. Protect your capital like your life depends on it.\n\n3/ Position sizing is everything\nSmaller positions = longer survival = more opportunities\n\n4/ Diversify your trades\nDon't put all eggs in one currency pair basket\n\n5/ Keep a trading journal\nTrack what works, what doesn't. Data beats emotions.\n\n💬 Which rule do you struggle with most?\n\n#TradingTips #RiskManagement #ForexEducation",
      hashtags: ["TradingTips", "RiskManagement", "ForexEducation"],
      scheduledDate: "2024-01-03T14:30:00Z",
      performance: {
        estimated_reach: 5200,
        estimated_engagement: 420,
        optimal_time: "2:30 PM EST",
      },
    },
    {
      id: "post-3",
      platform: "linkedin",
      type: "article",
      status: "pending_review",
      title: "The Psychology Behind Successful Trading: A Deep Dive",
      content:
        "The Mindset That Separates Profitable Traders from the Rest\n\nAfter analyzing 10,000+ trades from our community, we've discovered the psychological patterns that consistently lead to profitability.\n\n🧠 THE WINNER'S MINDSET:\n\n1. Process Over Profits\nSuccessful traders focus on executing their strategy perfectly, not on individual trade outcomes. They measure success by adherence to their trading plan, not by daily P&L.\n\n2. Emotional Detachment\nTop performers treat trading like a business. They don't celebrate wins or mourn losses—they analyze, learn, and improve.\n\n3. Patience as a Superpower\nThe best setups don't come daily. Elite traders wait for their A+ setups rather than forcing trades out of boredom.\n\n📊 Our data shows traders who implement these psychological principles see 34% better risk-adjusted returns.\n\nWhat's your biggest psychological challenge in trading? Share your thoughts below.\n\n#TradingPsychology #FinancialMarkets #TradingEducation #ProfessionalTrading",
      hashtags: ["TradingPsychology", "FinancialMarkets", "TradingEducation"],
      scheduledDate: "2024-01-04T10:00:00Z",
      performance: {
        estimated_reach: 3800,
        estimated_engagement: 290,
        optimal_time: "10:00 AM EST",
      },
    },
    {
      id: "post-4",
      platform: "instagram",
      type: "story",
      status: "approved",
      title: "Live Trading Session Preview",
      content:
        "🔴 GOING LIVE in 30 minutes!\n\nJoin our morning market analysis session where we'll cover:\n\n📈 Pre-market movers\n🎯 Today's trade setups\n💰 Risk management tips\n❓ Q&A with our community\n\nSet your notifications ON 🔔",
      media: [
        {
          type: "video",
          url: "/api/placeholder/video/story",
          thumbnail: "/api/placeholder/400/700",
          duration: 15,
          altText: "Animated story preview for live trading session",
        },
      ],
      scheduledDate: "2024-01-03T08:30:00Z",
      performance: {
        estimated_reach: 1800,
        estimated_engagement: 220,
        optimal_time: "8:30 AM EST",
      },
    },
    {
      id: "post-5",
      platform: "facebook",
      type: "post",
      status: "pending_review",
      title: "Weekly Market Outlook",
      content:
        "📅 WEEKLY MARKET OUTLOOK: January 1-5, 2024\n\n🗓️ Key Events This Week:\n\n Monday: Manufacturing PMI (USA)\n Tuesday: Consumer Confidence Index\n Wednesday: Fed Meeting Minutes Release\n Thursday: Initial Jobless Claims\n Friday: Non-Farm Payrolls (NFP) 🚨\n\n💡 Trading Focus:\n• USD pairs will be highly volatile around NFP\n• Watch for EUR strength on ECB policy hints\n• Gold may react to inflation expectations\n\n📊 Our algorithm suggests:\n✅ Long EUR/USD if above 1.0950\n✅ Short GBP/JPY if below 185.50\n✅ Gold long if it breaks $2,080\n\n⚠️ Remember: Always manage your risk and never trade more than you can afford to lose.\n\nJoin our premium signals group for real-time alerts! 🔔\n\n#WeeklyOutlook #ForexSignals #TradingCommunity #MarketAnalysis #NFP",
      hashtags: ["WeeklyOutlook", "ForexSignals", "TradingCommunity"],
      scheduledDate: "2024-01-01T18:00:00Z",
      performance: {
        estimated_reach: 4200,
        estimated_engagement: 380,
        optimal_time: "6:00 PM EST",
      },
    },
    {
      id: "post-6",
      platform: "youtube",
      type: "video",
      status: "draft",
      title: "Complete Beginner's Guide to Reading Forex Charts",
      content:
        "📹 NEW VIDEO: Master Chart Reading in 15 Minutes!\n\nWhat you'll learn:\n🎯 Understanding candlestick patterns\n📊 Reading support & resistance levels\n📈 Identifying trend directions\n⚡ Entry and exit strategies\n💰 Risk management basics\n\nPerfect for beginners who want to start trading with confidence!\n\n👍 Like if this helps you\n💬 Comment your biggest chart reading challenge\n🔔 Subscribe for daily trading education\n\n#ForexEducation #ChartAnalysis #TradingBasics #BeginnerTrader",
      media: [
        {
          type: "video",
          url: "/api/placeholder/video/youtube",
          thumbnail: "/api/placeholder/800/450",
          duration: 900,
          altText: "Educational video thumbnail showing forex chart analysis",
        },
      ],
      scheduledDate: "2024-01-05T16:00:00Z",
      performance: {
        estimated_reach: 8500,
        estimated_engagement: 680,
        optimal_time: "4:00 PM EST",
      },
    },
  ],
};

const ContentResults: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { approveContent } = useContentGeneration();
  const { addToast } = useToasts();

  const handleApproval = (postId: string, approved: boolean) => {
    approveContent({ itemId: postId, approved });
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      instagram: Instagram,
      twitter: Twitter,
      linkedin: Linkedin,
      facebook: Facebook,
      youtube: Youtube,
    };
    const Icon = icons[platform as keyof typeof icons] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "story":
        return <Image className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <AppLayout>
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            Content Generated Successfully!
          </h1>
          <p className="text-muted-foreground mt-2">
            {generatedContent.posts.length} posts generated for{" "}
            {generatedContent.plan.platforms.length} platforms. Review and
            approve before scheduling.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/calendar">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </Link>
          <Button>
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve All
          </Button>
        </div>
      </motion.div>

      {/* Plan Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {(generatedContent.posts || []).length}
                </div>
                <div className="text-sm text-muted-foreground">Total Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {generatedContent.plan.platforms.length}
                </div>
                <div className="text-sm text-muted-foreground">Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {
                    (generatedContent.posts || []).filter(
                      (p) => p.status === "pending_review",
                    ).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  Pending Review
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    (generatedContent.posts || []).reduce(
                      (sum, post) =>
                        sum + (post.performance?.estimated_engagement || 0),
                      0,
                    ) / Math.max((generatedContent.posts || []).length, 1),
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Avg. Est. Engagement
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">All Posts</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(generatedContent.posts || []).slice(0, 4).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(post.platform)}
                          <span className="font-medium capitalize">
                            {post.platform}
                          </span>
                          <Badge
                            variant="outline"
                            className={getStatusColor(post.status)}
                          >
                            {post.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(post.type)}
                          <span className="text-sm text-muted-foreground capitalize">
                            {post.type}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-foreground line-clamp-4">
                        {post.content}
                      </div>

                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.hashtags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                          {post.hashtags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{post.hashtags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-3 w-3" />
                            {post.performance.estimated_reach} reach
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {post.performance.estimated_engagement} eng.
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(post.scheduledDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproval(post.id, true)}
                          className="flex-1"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproval(post.id, false)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>All Generated Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Est. Reach</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(generatedContent.posts || []).map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(post.platform)}
                            <span className="capitalize">{post.platform}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {post.title}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getTypeIcon(post.type)}
                            <span className="capitalize">{post.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(post.status)}>
                            {post.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(post.scheduledDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {post.performance.estimated_reach.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Estimated Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Reach</span>
                      <span className="font-semibold">
                        {(generatedContent.posts || [])
                          .reduce(
                            (sum, post) =>
                              sum + (post.performance?.estimated_reach || 0),
                            0,
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Engagement</span>
                      <span className="font-semibold">
                        {(generatedContent.posts || [])
                          .reduce(
                            (sum, post) =>
                              sum +
                              (post.performance?.estimated_engagement || 0),
                            0,
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Engagement Rate</span>
                      <span className="font-semibold text-green-600">8.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Platform Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["instagram", "twitter", "linkedin", "facebook"].map(
                      (platform) => {
                        const platformPosts = (
                          generatedContent.posts || []
                        ).filter((p) => p.platform === platform);
                        const totalReach = platformPosts.reduce(
                          (sum, post) => sum + post.performance.estimated_reach,
                          0,
                        );
                        return (
                          <div
                            key={platform}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(platform)}
                              <span className="capitalize">{platform}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">
                                {platformPosts.length} posts
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {totalReach.toLocaleString()} reach
                              </div>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["post", "story", "video", "article"].map((type) => {
                      const typePosts = (generatedContent.posts || []).filter(
                        (p) => p.type === type,
                      );
                      return (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            {getTypeIcon(type)}
                            <span className="capitalize">{type}s</span>
                          </div>
                          <span className="font-semibold">
                            {typePosts.length}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Publishing Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(generatedContent.posts || [])
                    .sort(
                      (a, b) =>
                        new Date(a.scheduledDate).getTime() -
                        new Date(b.scheduledDate).getTime(),
                    )
                    .map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-semibold">
                              {new Date(post.scheduledDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" },
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(post.scheduledDate).toLocaleTimeString(
                                "en-US",
                                { hour: "numeric", minute: "2-digit" },
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(post.platform)}
                            <span className="capitalize">{post.platform}</span>
                          </div>
                          <div className="max-w-md truncate">{post.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(post.status)}>
                            {post.status.replace("_", " ")}
                          </Badge>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
    </AppLayout>
  );
};

export default ContentResults;