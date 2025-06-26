import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  MousePointer,
  Heart,
  Share,
  TrendingUp,
  Calendar,
  User,
  FileText,
  BarChart3,
  ExternalLink,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { Article } from "@/types";

interface PlatformDetails {
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
}

interface ContentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "post" | "platform";
  data: Article | PlatformDetails | null;
}

const ContentDetailsModal = ({
  isOpen,
  onClose,
  type,
  data,
}: ContentDetailsModalProps) => {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyUrl = () => {
    if (type === "post" && data) {
      const postData = data as Article;
      navigator.clipboard.writeText(
        `https://contentpro.com/posts/${postData.id}`,
      );
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      Blog: "📝",
      Twitter: "🐦",
      LinkedIn: "💼",
      Instagram: "📸",
      YouTube: "🎥",
      Facebook: "👥",
      blog: "📝",
      twitter: "🐦",
      linkedin: "💼",
      instagram: "📸",
      youtube: "🎥",
      facebook: "👥",
    };
    return icons[platform] || "📄";
  };

  if (!data) return null;

  if (type === "post") {
    const post = data as Article;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Content Details</span>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Post Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        post.status === "published" ? "default" : "secondary"
                      }
                    >
                      {post.status}
                    </Badge>
                    {post.platform.map((platform, index) => (
                      <Badge key={index} variant="outline">
                        {getPlatformIcon(platform)} {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Created: {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  {post.publishedAt && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Published:{" "}
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Eye className="h-8 w-8 mx-auto mb-2 text-brand-500" />
                    <div className="text-2xl font-bold">
                      {post.views.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <MousePointer className="h-8 w-8 mx-auto mb-2 text-warning-500" />
                    <div className="text-2xl font-bold">
                      {Math.floor(post.views * 0.12).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Clicks</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Share className="h-8 w-8 mx-auto mb-2 text-success-500" />
                    <div className="text-2xl font-bold">
                      {post.shares.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Shares</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-destructive" />
                    <div className="text-2xl font-bold">
                      {Math.floor(post.views * 0.08)}
                    </div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </CardContent>
                </Card>
              </div>

              {/* Keywords & SEO */}
              <Card>
                <CardHeader>
                  <CardTitle>Keywords & SEO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Target Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {post.seoTitle && (
                    <div>
                      <h4 className="font-medium mb-1">SEO Title</h4>
                      <p className="text-sm text-muted-foreground">
                        {post.seoTitle}
                      </p>
                    </div>
                  )}
                  {post.seoDescription && (
                    <div>
                      <h4 className="font-medium mb-1">SEO Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {post.seoDescription}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Generated Content</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyUrl}
                    className="space-x-2"
                  >
                    {copiedUrl ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span>{copiedUrl ? "Copied!" : "Copy URL"}</span>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 p-4 rounded-lg">
                      {post.content}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Content length: {post.content.length} characters • Estimated
                    reading time:{" "}
                    {Math.ceil(post.content.split(" ").length / 200)} minutes
                  </div>
                </CardContent>
              </Card>

              {/* Media Attachments */}
              {post.media && post.media.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Media Attachments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {post.media.map((media, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-3 space-y-2"
                        >
                          {media.thumbnailUrl && (
                            <img
                              src={media.thumbnailUrl}
                              alt={media.name}
                              className="w-full h-20 object-cover rounded"
                            />
                          )}
                          <div className="text-sm">
                            <div className="font-medium truncate">
                              {media.name}
                            </div>
                            <div className="text-muted-foreground">
                              {media.type} • {(media.size / 1024).toFixed(1)}KB
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Performance Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {Array.from({ length: 7 }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (6 - i));
                        const views = Math.floor(
                          Math.random() * (post.views / 7) + post.views / 14,
                        );
                        return (
                          <div key={i} className="space-y-2">
                            <div className="text-xs text-muted-foreground">
                              {date.toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </div>
                            <div
                              className="bg-brand-500 rounded-sm mx-auto"
                              style={{
                                height: `${Math.max(4, (views / (post.views / 7)) * 40)}px`,
                                width: "20px",
                              }}
                            />
                            <div className="text-xs font-medium">{views}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Likes</span>
                        <span className="text-sm font-medium">
                          {Math.floor(post.views * 0.08)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Shares</span>
                        <span className="text-sm font-medium">
                          {post.shares}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Comments</span>
                        <span className="text-sm font-medium">
                          {Math.floor(post.views * 0.03)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Saves</span>
                        <span className="text-sm font-medium">
                          {Math.floor(post.views * 0.05)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {post.platform.map((platform, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span>{getPlatformIcon(platform)}</span>
                            <span className="text-sm font-medium">
                              {platform}
                            </span>
                          </div>
                          <span className="text-sm">
                            {Math.floor(post.views / post.platform.length)}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-brand-500 h-2 rounded-full"
                            style={{
                              width: `${Math.floor(Math.random() * 40 + 40)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-gradient-to-r from-brand-500 to-brand-600">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Platform analytics modal
  const platform = data as PlatformDetails;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-xl">
              {getPlatformIcon(platform.platform)}
            </span>
            <span>{platform.platform} Analytics</span>
            <Badge variant="secondary">AI Generated Content</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-brand-500" />
                <div className="text-2xl font-bold">
                  {platform.metrics.totalGenerated}
                </div>
                <div className="text-sm text-muted-foreground">Generated</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-success-500" />
                <div className="text-2xl font-bold">
                  {platform.metrics.totalPublished}
                </div>
                <div className="text-sm text-muted-foreground">Published</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 mx-auto mb-2 text-info-500" />
                <div className="text-2xl font-bold">
                  {platform.metrics.views.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-warning-500" />
                <div className="text-2xl font-bold">
                  {platform.metrics.engagementRate}%
                </div>
                <div className="text-sm text-muted-foreground">Eng. Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Publish Rate</span>
                    <span className="text-sm font-medium">
                      {(
                        (platform.metrics.totalPublished /
                          platform.metrics.totalGenerated) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg. Views per Post</span>
                    <span className="text-sm font-medium">
                      {Math.floor(
                        platform.metrics.views /
                          platform.metrics.totalPublished,
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Click-Through Rate</span>
                    <span className="text-sm font-medium">
                      {(
                        (platform.metrics.clicks / platform.metrics.views) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="text-sm font-medium">
                      {(
                        (platform.metrics.conversions /
                          platform.metrics.views) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Content Quality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Content Quality Score</span>
                    <Badge variant="default">
                      {Math.floor(platform.metrics.engagementRate * 10)}/100
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Engagement Quality</span>
                    <Badge
                      variant={
                        platform.metrics.engagementRate >= 10
                          ? "default"
                          : platform.metrics.engagementRate >= 7
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {platform.metrics.engagementRate >= 10
                        ? "Excellent"
                        : platform.metrics.engagementRate >= 7
                          ? "Good"
                          : platform.metrics.engagementRate >= 4
                            ? "Average"
                            : "Needs Work"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Content Velocity</span>
                    <span className="text-sm font-medium">
                      {Math.floor(platform.metrics.totalGenerated / 30)} per day
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="text-sm font-medium">
                      {(
                        (platform.metrics.totalPublished /
                          platform.metrics.totalGenerated) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Content Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Recent AI Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium">
                        AI Generated {platform.platform} Post #{i + 1}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Published {i + 1} days ago
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm font-medium">
                        {Math.floor(Math.random() * 5000 + 1000)} views
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 200 + 50)} engagements
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-brand-500 to-brand-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Full Analytics
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentDetailsModal;
