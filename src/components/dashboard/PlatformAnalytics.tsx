import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Heart,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface PlatformMetrics {
  views: number;
  engagement: number;
  conversions: number;
  totalGenerated: number;
  totalPublished: number;
  clicks: number;
  engagementRate: number;
}

interface PlatformData {
  platform: string;
  metrics: PlatformMetrics;
}

interface PlatformAnalyticsProps {
  data: PlatformData[];
}

const PlatformAnalytics = ({ data }: PlatformAnalyticsProps) => {
  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      Blog: "📝",
      Twitter: "🐦",
      LinkedIn: "💼",
      Instagram: "📸",
      YouTube: "🎥",
      Facebook: "👥",
    };
    return icons[platform] || "📄";
  };

  const getPublishRate = (generated: number, published: number) => {
    if (generated === 0) return 0;
    return ((published / generated) * 100).toFixed(1);
  };

  const getClickThroughRate = (views: number, clicks: number) => {
    if (views === 0) return 0;
    return ((clicks / views) * 100).toFixed(2);
  };

  const getPerformanceStatus = (engagementRate: number) => {
    if (engagementRate >= 10) return { label: "Excellent", color: "success" };
    if (engagementRate >= 7) return { label: "Good", color: "brand" };
    if (engagementRate >= 4) return { label: "Average", color: "warning" };
    return { label: "Needs Work", color: "destructive" };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>AI Content Platform Analytics</span>
          <Badge variant="secondary" className="text-xs">
            Live Data
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Comprehensive performance metrics for AI-generated content across all
          platforms
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Platform</TableHead>
                <TableHead className="text-center">Content Generated</TableHead>
                <TableHead className="text-center">Published</TableHead>
                <TableHead className="text-center">Publish Rate</TableHead>
                <TableHead className="text-center">Views</TableHead>
                <TableHead className="text-center">Clicks</TableHead>
                <TableHead className="text-center">CTR</TableHead>
                <TableHead className="text-center">Engagement</TableHead>
                <TableHead className="text-center">Eng. Rate</TableHead>
                <TableHead className="text-center">Conversions</TableHead>
                <TableHead className="text-center">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((platform, index) => {
                const publishRate = getPublishRate(
                  platform.metrics.totalGenerated,
                  platform.metrics.totalPublished,
                );
                const ctr = getClickThroughRate(
                  platform.metrics.views,
                  platform.metrics.clicks,
                );
                const status = getPerformanceStatus(
                  platform.metrics.engagementRate,
                );

                return (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <span
                          className="text-lg"
                          role="img"
                          aria-label={platform.platform}
                        >
                          {getPlatformIcon(platform.platform)}
                        </span>
                        <div>
                          <div className="font-medium">{platform.platform}</div>
                          <div className="text-xs text-muted-foreground">
                            AI Generated
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <FileText className="h-4 w-4 text-brand-500" />
                        <span className="font-medium">
                          {platform.metrics.totalGenerated}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="h-4 w-4 text-success-500" />
                        <span className="font-medium">
                          {platform.metrics.totalPublished}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        variant={
                          parseFloat(publishRate) >= 80
                            ? "default"
                            : parseFloat(publishRate) >= 60
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {publishRate}%
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Eye className="h-4 w-4 text-info-500" />
                        <span className="font-medium">
                          {platform.metrics.views.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <MousePointer className="h-4 w-4 text-warning-500" />
                        <span className="font-medium">
                          {platform.metrics.clicks.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="font-medium text-sm">{ctr}%</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Heart className="h-4 w-4 text-destructive" />
                        <span className="font-medium">
                          {platform.metrics.engagement.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {platform.metrics.engagementRate >= 7 ? (
                          <TrendingUp className="h-4 w-4 text-success-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-warning-500" />
                        )}
                        <span className="font-medium">
                          {platform.metrics.engagementRate}%
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="font-medium">
                        {platform.metrics.conversions}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        variant={
                          status.color === "success"
                            ? "default"
                            : status.color === "brand"
                              ? "secondary"
                              : status.color === "warning"
                                ? "outline"
                                : "destructive"
                        }
                        className="text-xs"
                      >
                        {status.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Summary Row */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-brand-600">
                {data.reduce((sum, p) => sum + p.metrics.totalGenerated, 0)}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Generated
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success-600">
                {data.reduce((sum, p) => sum + p.metrics.totalPublished, 0)}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Published
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-info-600">
                {data
                  .reduce((sum, p) => sum + p.metrics.views, 0)
                  .toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning-600">
                {data.reduce((sum, p) => sum + p.metrics.conversions, 0)}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Conversions
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformAnalytics;
