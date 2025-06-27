import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Clock,
  AlertCircle,
  Loader2,
  Search,
  Brain,
  Calendar,
  FileText,
  ImageIcon,
  Sparkles,
  TrendingUp,
  Globe,
  Target,
  Video,
  Rss,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export interface StepperStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "error";
  estimatedTime?: string;
  startTime?: string;
  completedTime?: string;
  substeps?: StepperSubstep[];
  icon?: React.ComponentType<{ className?: string }>;
}

export interface StepperSubstep {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed" | "error";
  estimatedTime?: string;
  completedTime?: string;
  details?: string;
}

interface VerticalStepperProps {
  steps: StepperStep[];
  className?: string;
}

const defaultSteps: StepperStep[] = [
  {
    id: "analysis",
    title: "Business Analysis & Research",
    description:
      "Analyzing your business information, target audience, and competitive landscape",
    status: "pending",
    estimatedTime: "2-3 minutes",
    icon: Brain,
    substeps: [
      {
        id: "business-info",
        title: "Processing business information",
        status: "pending",
        estimatedTime: "30 seconds",
        details: "Analyzing company profile and target audience",
      },
      {
        id: "competitor-analysis",
        title: "Competitive landscape analysis",
        status: "pending",
        estimatedTime: "1-2 minutes",
        details: "Scanning competitor websites and strategies",
      },
      {
        id: "market-research",
        title: "Market trend research",
        status: "pending",
        estimatedTime: "45 seconds",
        details: "Identifying current market trends and opportunities",
      },
    ],
  },
  {
    id: "keyword-research",
    title: "Keyword & SEO Research",
    description:
      "Researching primary and secondary keywords, analyzing search volumes and competition",
    status: "pending",
    estimatedTime: "3-4 minutes",
    icon: Search,
    substeps: [
      {
        id: "primary-keywords",
        title: "Primary keyword analysis",
        status: "pending",
        estimatedTime: "1 minute",
        details: "Analyzing search volume and competition for primary keywords",
      },
      {
        id: "secondary-keywords",
        title: "Secondary keyword research",
        status: "pending",
        estimatedTime: "1 minute",
        details: "Finding related keywords and long-tail opportunities",
      },
      {
        id: "competitor-keywords",
        title: "Competitor keyword analysis",
        status: "pending",
        estimatedTime: "1-2 minutes",
        details: "Identifying keywords competitors are ranking for",
      },
    ],
  },
  {
    id: "content-strategy",
    title: "Content Strategy Development",
    description:
      "Creating comprehensive content strategy and calendar framework",
    status: "pending",
    estimatedTime: "2-3 minutes",
    icon: TrendingUp,
    substeps: [
      {
        id: "content-pillars",
        title: "Defining content pillars",
        status: "pending",
        estimatedTime: "1 minute",
        details: "Establishing key themes and topics for your content",
      },
      {
        id: "platform-strategy",
        title: "Platform-specific strategies",
        status: "pending",
        estimatedTime: "1-2 minutes",
        details: "Optimizing content approach for each social platform",
      },
    ],
  },
  {
    id: "calendar-generation",
    title: "Content Calendar Creation",
    description:
      "Generating 30-day content calendar with optimal posting schedule",
    status: "pending",
    estimatedTime: "1-2 minutes",
    icon: Calendar,
    substeps: [
      {
        id: "calendar-structure",
        title: "Building calendar framework",
        status: "pending",
        estimatedTime: "30 seconds",
        details: "Creating posting schedule and content mix",
      },
      {
        id: "optimal-timing",
        title: "Optimizing posting times",
        status: "pending",
        estimatedTime: "45 seconds",
        details: "Analyzing best times to post for your audience",
      },
    ],
  },
  {
    id: "content-creation",
    title: "Content Generation",
    description:
      "Creating engaging posts, articles, and copy for all platforms",
    status: "pending",
    estimatedTime: "5-7 minutes",
    icon: FileText,
    substeps: [
      {
        id: "social-posts",
        title: "Social media posts",
        status: "pending",
        estimatedTime: "2-3 minutes",
        details: "Generating Instagram, Twitter, LinkedIn, and Facebook posts",
      },
      {
        id: "blog-articles",
        title: "Blog articles",
        status: "pending",
        estimatedTime: "2-3 minutes",
        details: "Creating in-depth blog content and articles",
      },
      {
        id: "video-scripts",
        title: "Video scripts",
        status: "pending",
        estimatedTime: "1-2 minutes",
        details: "Writing scripts for YouTube and social video content",
      },
    ],
  },
  {
    id: "media-generation",
    title: "Visual Content Creation",
    description:
      "Generating images, graphics, and visual elements for your content",
    status: "pending",
    estimatedTime: "3-4 minutes",
    icon: ImageIcon,
    substeps: [
      {
        id: "social-graphics",
        title: "Social media graphics",
        status: "pending",
        estimatedTime: "1-2 minutes",
        details: "Creating post graphics and story templates",
      },
      {
        id: "blog-images",
        title: "Blog featured images",
        status: "pending",
        estimatedTime: "1 minute",
        details: "Generating hero images for blog articles",
      },
      {
        id: "video-thumbnails",
        title: "Video thumbnails",
        status: "pending",
        estimatedTime: "1 minute",
        details: "Creating eye-catching video thumbnails",
      },
    ],
  },
  {
    id: "optimization",
    title: "Content Optimization",
    description:
      "Optimizing content for SEO, engagement, and platform algorithms",
    status: "pending",
    estimatedTime: "2-3 minutes",
    icon: Target,
    substeps: [
      {
        id: "seo-optimization",
        title: "SEO optimization",
        status: "pending",
        estimatedTime: "1-2 minutes",
        details: "Optimizing content for search engines and keywords",
      },
      {
        id: "engagement-optimization",
        title: "Engagement optimization",
        status: "pending",
        estimatedTime: "1 minute",
        details: "Adding CTAs, hashtags, and engagement elements",
      },
    ],
  },
  {
    id: "finalization",
    title: "Final Review & Packaging",
    description: "Finalizing content plan and preparing for review",
    status: "pending",
    estimatedTime: "1 minute",
    icon: Sparkles,
    substeps: [
      {
        id: "quality-check",
        title: "Quality assurance",
        status: "pending",
        estimatedTime: "30 seconds",
        details: "Final review of all generated content",
      },
      {
        id: "packaging",
        title: "Content packaging",
        status: "pending",
        estimatedTime: "30 seconds",
        details: "Organizing content for easy review and scheduling",
      },
    ],
  },
];

export const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps = defaultSteps,
  className,
}) => {
  const navigate = useNavigate()
  const getStatusIcon = (status: StepperStep["status"], isSubstep = false) => {
    const iconSize = isSubstep ? "h-3 w-3" : "h-4 w-4";

    switch (status) {
      case "completed":
        return <Check className={cn(iconSize, "text-green-600")} />;
      case "in-progress":
        return (
          <Loader2 className={cn(iconSize, "text-blue-600 animate-spin")} />
        );
      case "error":
        return <AlertCircle className={cn(iconSize, "text-red-600")} />;
      default:
        return <Clock className={cn(iconSize, "text-gray-400")} />;
    }
  };

  const getStatusColor = (status: StepperStep["status"]) => {
    switch (status) {
      case "completed":
        return "border-green-600 bg-green-50";
      case "in-progress":
        return "border-blue-600 bg-blue-50";
      case "error":
        return "border-red-600 bg-red-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

   React.useEffect(() => {
    if (
      steps.length > 0 &&
      steps.every((step) => step.status === "completed")
    ) {
      navigate("/results");
    }
  }, [steps, navigate]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-9999 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl shadow-2xl border max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b p-6">
          <div className="text-center space-y-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
            <h2 className="text-xl font-bold">Generating Your Content Plan</h2>
            <p className="text-sm text-muted-foreground">
              Creating 30 days of optimized content across all platforms
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className={cn("space-y-6", className)}>
            {steps.map((step, stepIndex) => {
              const StepIcon = step.icon || Brain;
              const isLastStep = stepIndex === steps.length - 1;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: stepIndex * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {!isLastStep && (
                    <div className="absolute left-6 top-14 w-0.5 h-20 bg-border" />
                  )}

                  <div className="flex items-start space-x-4">
                    {/* Step Icon Circle */}
                    <motion.div
                      className={cn(
                        "flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center",
                        getStatusColor(step.status),
                      )}
                      animate={
                        step.status === "in-progress"
                          ? { scale: [1, 1.05, 1] }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {step.status === "in-progress" ? (
                        <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                      ) : (
                        <StepIcon
                          className={cn(
                            "h-5 w-5",
                            step.status === "completed"
                              ? "text-green-600"
                              : step.status === "error"
                                ? "text-red-600"
                                : (step.status as StepperStep["status"]) === "in-progress"
                                  ? "text-blue-600"
                                  : "text-gray-400",
                          )}
                        />
                      )}
                    </motion.div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3
                          className={cn(
                            "font-medium",
                            step.status === "completed"
                              ? "text-green-700"
                              : step.status === "in-progress"
                                ? "text-blue-700"
                                : step.status === "error"
                                  ? "text-red-700"
                                  : "text-foreground",
                          )}
                        >
                          {step.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {step.status === "in-progress" && (
                            <Badge variant="secondary" className="text-xs">
                              In Progress
                            </Badge>
                          )}
                          {step.status === "completed" &&
                            step.completedTime && (
                              <span className="text-xs text-muted-foreground">
                                {formatTime(step.completedTime)}
                              </span>
                            )}
                          {step.status === "pending" && step.estimatedTime && (
                            <span className="text-xs text-muted-foreground">
                              ~{step.estimatedTime}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>

                      {step.startTime && step.status === "in-progress" && (
                        <p className="text-xs text-blue-600 mt-1">
                          Started at {formatTime(step.startTime)}
                        </p>
                      )}

                      {/* Substeps */}
                      {step.substeps && step.substeps.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={
                            step.status === "in-progress" ||
                            step.status === "completed"
                              ? { opacity: 1, height: "auto" }
                              : { opacity: 0.5, height: "auto" }
                          }
                          className="mt-3 space-y-2 pl-4 border-l-2 border-border"
                        >
                          {step.substeps.map((substep, substepIndex) => (
                            <motion.div
                              key={substep.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: substepIndex * 0.1 }}
                              className="flex items-center justify-between py-1"
                            >
                              <div className="flex items-center space-x-2 min-w-0 flex-1">
                                {getStatusIcon(substep.status, true)}
                                <div className="min-w-0 flex-1">
                                  <p
                                    className={cn(
                                      "text-xs font-medium",
                                      substep.status === "completed"
                                        ? "text-green-600"
                                        : substep.status === "in-progress"
                                          ? "text-blue-600"
                                          : substep.status === "error"
                                            ? "text-red-600"
                                            : "text-muted-foreground",
                                    )}
                                  >
                                    {substep.title}
                                  </p>
                                  {substep.details && (
                                    <p className="text-xs text-muted-foreground">
                                      {substep.details}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center space-x-1">
                                {substep.status === "completed" &&
                                  substep.completedTime && (
                                    <span className="text-xs text-green-600">
                                      {formatTime(substep.completedTime)}
                                    </span>
                                  )}
                                {substep.status === "pending" &&
                                  substep.estimatedTime && (
                                    <span className="text-xs text-muted-foreground">
                                      ~{substep.estimatedTime}
                                    </span>
                                  )}
                                {substep.status === "in-progress" && (
                                  <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                    }}
                                    className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                                  />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-muted/30">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Estimated completion: 15-20 minutes</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>Generating 30+ pieces of content</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};