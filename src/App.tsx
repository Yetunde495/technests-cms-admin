import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";

// Main Pages
import Dashboard from "./pages/dashboard/Dashboard";

// Blog CMS Pages
import BlogManager from "./pages/blog/BlogManager";
import BlogEditor from "./pages/blog/BlogEditor";
import BlogView from "./pages/blog/BlogView";

// Placeholder Pages with Icons
import PlaceholderPage from "./pages/PlaceholderPage";
import {
  FileText,
  Share2,
  BarChart3,
  FolderOpen,
  MessageSquare,
  Settings,
} from "lucide-react";

import NotFound from "./pages/NotFound";
import axios from "axios";

axios.defaults.baseURL = "https://technests.onrender.com/v1";

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

function App() {
  axios.interceptors.request.use(
    (axiosConfig) => {
      const token = localStorage.getItem("auth_token");
      axiosConfig.headers.Authorization = `Bearer ${token}`;
      return axiosConfig;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (error?.response?.status === 401) {
          // localStorage.removeItem("auth_token");
          // localStorage.removeItem("user");
          // window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    },
  );

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
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

          {/* Blog CMS Routes */}
          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <BlogManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/new"
            element={
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute>
                <BlogView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:id/edit"
            element={
              <ProtectedRoute>
                <BlogEditor />
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

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
