import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Heart,
  Share,
  MessageCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Article } from "@/types";

interface PostPerformanceProps {
  posts: Article[];
}

const PostPerformance = ({ posts }: PostPerformanceProps) => {
  const sortedPosts = posts
    .filter((post) => post.status === "published")
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const getPerformanceColor = (views: number) => {
    if (views > 1000) return "text-success-600";
    if (views > 500) return "text-warning-600";
    return "text-muted-foreground";
  };

  const getEngagementRate = (views: number, shares: number) => {
    if (views === 0) return 0;
    return ((shares / views) * 100).toFixed(1);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Performing Posts</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No published posts yet</p>
            </div>
          ) : (
            sortedPosts.map((post, index) => (
              <div
                key={post.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-600 font-bold text-sm">
                  #{index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium line-clamp-1">{post.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      <span className={getPerformanceColor(post.views)}>
                        {post.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Share className="h-3 w-3" />
                      <span>{post.shares}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Heart className="h-3 w-3" />
                      <span>{getEngagementRate(post.views, post.shares)}%</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {post.views > 1000 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-success-600" />
                        <span className="text-xs text-success-600 font-medium">
                          Hot
                        </span>
                      </>
                    ) : post.views > 500 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-warning-600" />
                        <span className="text-xs text-warning-600 font-medium">
                          Good
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">New</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {post.publishedAt &&
                      new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostPerformance;
