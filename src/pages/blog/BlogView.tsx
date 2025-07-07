import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Calendar,
  Tag,
  Clock,
  Dot,
  Kanban,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types";
import { fetchPostDetails } from "@/services/blogServices";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { useUser } from "@/context/AppContext";

const BlogView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetchPostDetails(id!);
      setPost(response?.entity);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch blog post:");
      navigate("/blog");
    } finally {
      setIsLoading(false);
    }
  };
  const initials = [user?.firstName?.[0] || "", user?.lastName?.[0] || ""]
    .join("")
    .toUpperCase();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-8 animate-pulse">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </AppLayout>
    );
  }

  if (!post) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Blog post not found</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/blog")}
          >
            Back to Blog Manager
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/blog")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog Manager
            </Button>
          </div>
          <Button
            onClick={() => navigate(`/blog/${id}/edit`)}
            className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Post
          </Button>
        </div>

        {/* Blog Post Content */}
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <div className="mb-8 w-full flex flex-col justify-center items-center text-center">
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-display font-bold mb-4">
              {post.title}
            </h1>

            {post.summary && (
              <p className="text-base max-w-xl text-muted-foreground mb-2">
                {post.summary}
              </p>
            )}
          </div>
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover rounded-md"
              />
            </div>
          )}
          <div>
            <div className="px-1">
              {/* Post Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center w-full space-x-6 justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {initials}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-sidebar-foreground truncate">
                        {user?.firstName + " " + user?.lastName}
                      </p>
                      <p className="text-xs text-sidebar-foreground/60 truncate">
                        Technests Admin
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {post?.readingTime}
                    </div>
                    <Dot />
                    {post.publishedAt && (
                      <div className="flex items-center text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        Published{" "}
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="w-full flex flex-col justify-center items-center">
                <div data-color-mode="light" className="w-full">
                  <div className="wmde-markdown-var">
                    <MDEditor.Markdown
                      source={post?.content || ""}
                      style={{
                        // whiteSpace: "pre-wrap",
                        minHeight: "350px",
                      }}
                      className="editor-preview h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Post Footer */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Meta Title: <br />
                    {/* {new Date(post.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })} */}
                    {post?.metaTitle}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    URL Slug:{" "}
                    <code className="bg-muted px-2 py-1 rounded">
                      {post?.urlSlug}
                    </code>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground my-3">
                  Meta Description: <br />
                  {post?.metaDescription}
                </div>
                <div className="text-sm text-muted-foreground my-3">
                  Meta Keywords: <br />
                  <div className="flex items-center space-x-2 mt-2 mb-4">
                    {post?.metaKeywords?.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        <Kanban className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BlogView;
