import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChartDataPoint {
  date: string;
  views: number;
  engagement: number;
  conversions: number;
}

interface PlatformData {
  platform: string;
  metrics: {
    views: number;
    engagement: number;
    conversions: number;
  };
  color: string;
}

interface AnalyticsChartProps {
  title: string;
  data: ChartDataPoint[];
  platformData?: PlatformData[];
  type: "line" | "bar" | "platform";
}

const AnalyticsChart = ({
  title,
  data,
  platformData,
  type,
}: AnalyticsChartProps) => {
  if (type === "platform" && platformData) {
    const maxViews = Math.max(...platformData.map((p) => p.metrics.views));

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformData.map((platform, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    />
                    <span className="font-medium">{platform.platform}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {platform.metrics.views.toLocaleString()} views
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: platform.color,
                          width: `${(platform.metrics.views / maxViews) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Engagement: {platform.metrics.engagement}</span>
                  <span>Conversions: {platform.metrics.conversions}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Simple line chart simulation
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.views, d.engagement, d.conversions)),
  );
  const chartHeight = 200;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-500 rounded-full" />
              <span>Views</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success-500 rounded-full" />
              <span>Engagement</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning-500 rounded-full" />
              <span>Conversions</span>
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative" style={{ height: chartHeight }}>
            <svg width="100%" height={chartHeight} className="overflow-visible">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={chartHeight * ratio}
                  x2="100%"
                  y2={chartHeight * ratio}
                  stroke="rgb(226, 232, 240)"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}

              {/* Views line */}
              <polyline
                points={data
                  .map(
                    (d, i) =>
                      `${(i / (data.length - 1)) * 100}%,${chartHeight - (d.views / maxValue) * chartHeight}`,
                  )
                  .join(" ")}
                fill="none"
                stroke="rgb(139, 92, 246)"
                strokeWidth="2"
              />

              {/* Engagement line */}
              <polyline
                points={data
                  .map(
                    (d, i) =>
                      `${(i / (data.length - 1)) * 100}%,${chartHeight - (d.engagement / maxValue) * chartHeight}`,
                  )
                  .join(" ")}
                fill="none"
                stroke="rgb(34, 197, 94)"
                strokeWidth="2"
              />

              {/* Conversions line */}
              <polyline
                points={data
                  .map(
                    (d, i) =>
                      `${(i / (data.length - 1)) * 100}%,${chartHeight - (d.conversions / maxValue) * chartHeight}`,
                  )
                  .join(" ")}
                fill="none"
                stroke="rgb(245, 158, 11)"
                strokeWidth="2"
              />

              {/* Data points */}
              {data.map((d, i) => (
                <g key={i}>
                  <circle
                    cx={`${(i / (data.length - 1)) * 100}%`}
                    cy={chartHeight - (d.views / maxValue) * chartHeight}
                    r="3"
                    fill="rgb(139, 92, 246)"
                  />
                  <circle
                    cx={`${(i / (data.length - 1)) * 100}%`}
                    cy={chartHeight - (d.engagement / maxValue) * chartHeight}
                    r="3"
                    fill="rgb(34, 197, 94)"
                  />
                  <circle
                    cx={`${(i / (data.length - 1)) * 100}%`}
                    cy={chartHeight - (d.conversions / maxValue) * chartHeight}
                    r="3"
                    fill="rgb(245, 158, 11)"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-muted-foreground">
            {data
              .filter((_, i) => i % Math.ceil(data.length / 5) === 0)
              .map((d, i) => (
                <span key={i}>
                  {new Date(d.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
