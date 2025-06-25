import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Main Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Upload from "./pages/upload/Upload";

// Placeholder Pages with Icons
import PlaceholderPage from "./pages/PlaceholderPage";
import {
  FileText,
  Share2,
  Calendar,
  BarChart3,
  FolderOpen,
  Edit,
  MessageSquare,
  Settings,
} from "lucide-react";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("auth_token");
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("auth_token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />

          {/* Placeholder Routes */}
          <Route
            path="/articles"
            element={
              <ProtectedRoute>
                <PlaceholderPage
                  title="Articles Management"
                  description="Manage all your generated articles in one place. View, edit, and track performance across all platforms."
                  icon={<FileText className="w-full h-full" />}
                  comingSoonFeatures={[
                    "View all generated articles in a searchable table",
                    "Filter by platform, status, and publication date",
                    "Edit article metadata and content",
                    "Download articles in multiple formats",
                    "Track views, shares, and engagement metrics",
                    "Bulk operations for managing multiple articles",
                  ]}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/social"
            element={
              <ProtectedRoute>
                <PlaceholderPage
                  title="Social Media Content"
                  description="Create, schedule, and manage social media content across all platforms with AI-powered optimization."
                  icon={<Share2 className="w-full h-full" />}
                  comingSoonFeatures={[
                    "Platform-specific content tabs (Twitter, Instagram, LinkedIn, etc.)",
                    "AI-generated social media posts from your content",
                    "Visual content preview and editing",
                    "Automated scheduling and publishing",
                    "Cross-platform content adaptation",
                    "Social media analytics and performance tracking",
                  ]}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <PlaceholderPage
                  title="Content Calendar"
                  description="Plan, schedule, and visualize your content strategy with an interactive calendar interface."
                  icon={<Calendar className="w-full h-full" />}
                  comingSoonFeatures={[
                    "Interactive monthly calendar view",
                    "Drag-and-drop content scheduling",
                    "Content type color coding",
                    "Day/week/month view options",
                    "Bulk scheduling operations",
                    "Integration with social media platforms",
                    "Calendar export functionality",
                  ]}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <PlaceholderPage
                  title="Analytics Dashboard"
                  description="Track performance, engagement, and ROI with comprehensive analytics across all your content and platforms."
                  icon={<BarChart3 className="w-full h-full" />}
                  comingSoonFeatures={[
                    "Real-time performance metrics",
                    "Platform-specific analytics breakdown",
                    "Interactive charts and graphs",
                    "Custom date range filtering",
                    "Content performance comparison",
                    "Audience insights and demographics",
                    "Exportable reports and dashboards",
                  ]}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/files"
            element={
              <ProtectedRoute>
                <PlaceholderPage
                  title="File Manager"
                  description="Organize and manage all your uploaded content with smart folder structures and powerful search capabilities."
                  icon={<FolderOpen className="w-full h-full" />}
                  comingSoonFeatures={[
                    "Hierarchical folder organization",
                    "File preview and thumbnails",
                    "Advanced search and filtering",
                    "Bulk file operations",
                    "File versioning and history",
                    "Storage usage analytics",
                    "Direct file sharing and collaboration",
                  ]}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <PlaceholderPage
                  title="Blog Manager"
                  description="Create, edit, and publish blog posts with a powerful CMS built for content marketers."
                  icon={<Edit className="w-full h-full" />}
                  comingSoonFeatures={[
                    "Rich text editor with markdown support",
                    "SEO optimization tools",
                    "Draft and published post management",
                    "Tag and category organization",
                    "Featured image management",
                    "URL slug customization",
                    "Publishing workflow and approvals",
                  ]}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <PlaceholderPage
                  title="Chat Conversations"
                  description="Monitor and manage customer conversations from your website's chatbot with AI-powered insights."
                  icon={<MessageSquare className="w-full h-full" />}
                  comingSoonFeatures={[
                    "Real-time conversation monitoring",
                    "Chat history and transcript search",
                    "Visitor identification and tracking",
                    "Response time analytics",
                    "AI-powered conversation insights",
                    "Lead qualification scoring",
                    "Integration with CRM systems",
                  ]}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <PlaceholderPage
                  title="Settings"
                  description="Configure your account, integrations, and preferences to optimize your content marketing workflow."
                  icon={<Settings className="w-full h-full" />}
                  comingSoonFeatures={[
                    "Account and profile management",
                    "Platform integrations and API keys",
                    "Team member management",
                    "Notification preferences",
                    "Billing and subscription settings",
                    "Security and privacy controls",
                    "Custom branding options",
                  ]}
                />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
