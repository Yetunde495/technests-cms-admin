import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GenerationRequest, ContentPlan, ContentItem } from "@/types";
import { StepperStep } from "@/components/ui/vertical-stepper";
import { useAppContext, useToasts } from "@/context/AppContext";

// Mock API calls - replace with actual backend integration
const mockApiCall = (data: any, delay: number = 1000) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const useContentGeneration = () => {
  const { dispatch } = useAppContext();
  const { addToast } = useToasts();
  const queryClient = useQueryClient();

  // Submit generation request
  const generateContentMutation = useMutation({
    mutationFn: async (
      request: Omit<
        GenerationRequest,
        "id" | "status" | "progress" | "createdAt"
      >,
    ) => {
      const generationRequest: GenerationRequest = {
        ...request,
        id: Math.random().toString(36).substr(2, 9),
        status: "pending",
        progress: 0,
        createdAt: new Date().toISOString(),
      };

      // Initialize stepper steps
      const stepperSteps: StepperStep[] = [
        {
          id: "analysis",
          title: "Business Analysis & Research",
          description:
            "Analyzing your business information, target audience, and competitive landscape",
          status: "pending",
          estimatedTime: "2-3 minutes",
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
          substeps: [
            {
              id: "primary-keywords",
              title: "Primary keyword analysis",
              status: "pending",
              estimatedTime: "1 minute",
              details:
                "Analyzing search volume and competition for primary keywords",
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
          substeps: [
            {
              id: "social-posts",
              title: "Social media posts",
              status: "pending",
              estimatedTime: "2-3 minutes",
              details:
                "Generating Instagram, Twitter, LinkedIn, and Facebook posts",
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

      // Start stepper
      dispatch({
        type: "SET_LOADING",
        payload: {
          isLoading: true,
          stepperSteps,
        },
      });

      // Simulate detailed step progression
      for (let stepIndex = 0; stepIndex < stepperSteps.length; stepIndex++) {
        const currentStep = stepperSteps[stepIndex];

        // Start step
        stepperSteps[stepIndex] = {
          ...currentStep,
          status: "in-progress",
          startTime: new Date().toISOString(),
        };

        dispatch({
          type: "SET_LOADING",
          payload: {
            isLoading: true,
            stepperSteps: [...stepperSteps],
          },
        });

        // Process substeps
        if (currentStep.substeps) {
          for (
            let substepIndex = 0;
            substepIndex < currentStep.substeps.length;
            substepIndex++
          ) {
            // Start substep
            stepperSteps[stepIndex].substeps![substepIndex].status =
              "in-progress";
            dispatch({
              type: "SET_LOADING",
              payload: {
                isLoading: true,
                stepperSteps: [...stepperSteps],
              },
            });

            // Simulate substep processing
            await mockApiCall(null, 1500 + Math.random() * 1000);

            // Complete substep
            stepperSteps[stepIndex].substeps![substepIndex] = {
              ...stepperSteps[stepIndex].substeps![substepIndex],
              status: "completed",
              completedTime: new Date().toISOString(),
            };

            dispatch({
              type: "SET_LOADING",
              payload: {
                isLoading: true,
                stepperSteps: [...stepperSteps],
              },
            });
          }
        } else {
          // Step without substeps
          await mockApiCall(null, 2000 + Math.random() * 1000);
        }

        // Complete step
        stepperSteps[stepIndex] = {
          ...stepperSteps[stepIndex],
          status: "completed",
          completedTime: new Date().toISOString(),
        };

        dispatch({
          type: "SET_LOADING",
          payload: {
            isLoading: true,
            stepperSteps: [...stepperSteps],
          },
        });

        // Small delay between steps
        await mockApiCall(null, 500);
      }

      // Final completion delay
      await mockApiCall(null, 1000);

      dispatch({
        type: "SET_LOADING",
        payload: {
          isLoading: false,
          message: "",
        },
      });

      return generationRequest;
    },
    onSuccess: (data) => {
      addToast({
        type: "success",
        title: "Content Generation Complete!",
        description:
          "Your content plan has been generated and is ready for review.",
      });

      // Refresh content plans
      queryClient.invalidateQueries({ queryKey: ["contentPlans"] });

      // Redirect to results page
      window.location.href = "/results";
    },
    onError: (error) => {
      dispatch({
        type: "SET_LOADING",
        payload: {
          isLoading: false,
          message: "",
        },
      });

      addToast({
        type: "error",
        title: "Generation Failed",
        description:
          "There was an error generating your content. Please try again.",
      });
    },
  });

  // Get content plans
  const useContentPlans = (brandId?: string) => {
    return useQuery({
      queryKey: ["contentPlans", brandId],
      queryFn: async () => {
        await mockApiCall(null, 500);

        // Mock content plans data
        const mockPlans: ContentPlan[] = [
          {
            id: "1",
            brandId: brandId || "default",
            title: "December Trading Signals Campaign",
            description:
              "Comprehensive social media strategy for December featuring market analysis, trading tips, and educational content.",
            month: "December",
            year: 2024,
            platforms: ["instagram", "twitter", "linkedin", "youtube"],
            status: "review",
            totalPosts: 45,
            generatedPosts: 45,
            approvedPosts: 12,
            scheduledPosts: 8,
            createdAt: "2024-11-15T10:00:00Z",
            updatedAt: "2024-11-20T14:30:00Z",
          },
          {
            id: "2",
            brandId: brandId || "default",
            title: "January Market Outlook Series",
            description:
              "New year market predictions and trading opportunities across multiple platforms.",
            month: "January",
            year: 2025,
            platforms: ["instagram", "facebook", "twitter", "blog"],
            status: "generating",
            totalPosts: 38,
            generatedPosts: 15,
            approvedPosts: 0,
            scheduledPosts: 0,
            createdAt: "2024-11-22T09:15:00Z",
            updatedAt: "2024-11-22T09:15:00Z",
          },
        ];

        return mockPlans;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get content items for a plan
  const useContentItems = (planId: string) => {
    return useQuery({
      queryKey: ["contentItems", planId],
      queryFn: async () => {
        await mockApiCall(null, 500);

        // Mock content items
        const mockItems: ContentItem[] = [
          {
            id: "1",
            planId,
            platform: "instagram",
            type: "post",
            title: "Morning Market Analysis",
            content:
              "🚀 Good morning traders! Here's your daily market snapshot:\n\n📈 SPY showing strong bullish momentum\n💡 Key levels to watch: 485 support, 490 resistance\n⚡ Trading opportunity: Breakout above 490\n\n#TradingSignals #MarketAnalysis #StockTrading",
            media: [],
            hashtags: ["TradingSignals", "MarketAnalysis", "StockTrading"],
            scheduledDate: "2024-12-01T08:00:00Z",
            status: "approved",
            analytics: {
              views: 1250,
              likes: 89,
              shares: 12,
              comments: 23,
              clicks: 45,
              reach: 980,
              impressions: 1450,
              engagementRate: 8.2,
              ctr: 3.6,
            },
            createdAt: "2024-11-20T10:00:00Z",
            updatedAt: "2024-11-20T14:30:00Z",
          },
        ];

        return mockItems;
      },
      enabled: !!planId,
    });
  };

  // Approve/reject content item
  const approveContentMutation = useMutation({
    mutationFn: async ({
      itemId,
      approved,
    }: {
      itemId: string;
      approved: boolean;
    }) => {
      await mockApiCall(null, 500);
      return { itemId, approved };
    },
    onSuccess: (data) => {
      addToast({
        type: "success",
        title: data.approved ? "Content Approved" : "Content Rejected",
        description: data.approved
          ? "Content has been approved and will be scheduled for posting."
          : "Content has been rejected and moved to drafts.",
      });

      // Refresh content items
      queryClient.invalidateQueries({ queryKey: ["contentItems"] });
    },
  });

  return {
    generateContent: generateContentMutation.mutate,
    isGenerating: generateContentMutation.isPending,
    useContentPlans,
    useContentItems,
    approveContent: approveContentMutation.mutate,
    isApproving: approveContentMutation.isPending,
  };
};