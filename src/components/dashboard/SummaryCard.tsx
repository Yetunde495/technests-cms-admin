import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  className?: string;
  color?: "default" | "brand" | "success" | "warning" | "info";
}

const colorVariants = {
  default: {
    icon: "bg-muted text-muted-foreground",
    card: "",
  },
  brand: {
    icon: "bg-brand-100 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400",
    card: "border-brand-200 dark:border-brand-800",
  },
  success: {
    icon: "bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400",
    card: "border-success-200 dark:border-success-800",
  },
  warning: {
    icon: "bg-warning-50 text-warning-600 dark:bg-warning-900/20 dark:text-warning-400",
    card: "border-warning-200 dark:border-warning-800",
  },
  info: {
    icon: "bg-info-50 text-info-600 dark:bg-info-900/20 dark:text-info-400",
    card: "border-info-200 dark:border-info-800",
  },
};

const SummaryCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  color = "default",
}: SummaryCardProps) => {
  const colors = colorVariants[color];

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        colors.card,
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={cn(
            "h-4 w-4 rounded-full p-3 flex items-center justify-center",
            colors.icon,
          )}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          {trend && (
            <div className="flex items-center space-x-1">
              <Badge
                variant={trend.isPositive ? "default" : "destructive"}
                className={cn(
                  "text-xs",
                  trend.isPositive
                    ? "bg-success-100 text-success-700 hover:bg-success-100 dark:bg-success-900/20 dark:text-success-400"
                    : "bg-destructive/10 text-destructive hover:bg-destructive/10",
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(trend.value)}%
              </Badge>
            </div>
          )}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-2">
            vs {trend.period}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
