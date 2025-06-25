import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Eye, Tag, X } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogApi } from "@/services/api";
import { BlogPost } from "@/types";

interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  status: "draft" | "published";
  tags: string[];
  featuredImage?: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  readingTime?: number;
  category?: string;
}

const BlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      status: "draft",
      tags: [],
      slug: "",
      seoTitle: "",
      seoDescription: "",
      category: "",
      readingTime: 5,
    },
  });

  const watchedContent = watch("content");
  const watchedTitle = watch("title");

  useEffect(() => {
    if (isEdit && id) {
      fetchPost();
    }
  }, [isEdit, id]);

  const fetchPost = async () => {
    try {
      const response = await blogApi.getById(id!);
      const post = response.data;
      setValue("title", post.title);
      setValue("content", post.content);
      setValue("excerpt", post.excerpt);
      setValue("status", post.status);
      setTags(post.tags);
      setValue("tags", post.tags);
      setValue("slug", post.slug);
      if (post.featuredImage) {
        setValue("featuredImage", post.featuredImage);
      }
      // Set metadata fields if they exist in the BlogPost type
      // Note: These fields may need to be added to the BlogPost interface
      if ((post as any).seoTitle) setValue("seoTitle", (post as any).seoTitle);
      if ((post as any).seoDescription)
        setValue("seoDescription", (post as any).seoDescription);
      if ((post as any).category) setValue("category", (post as any).category);
      if ((post as any).readingTime)
        setValue("readingTime", (post as any).readingTime);
      if (post.publishedAt)
        setValue("publishedAt", post.publishedAt.slice(0, 16));
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
      navigate("/blog");
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue("tags", newTags);
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSaving(true);
    try {
      data.tags = tags;

      if (isEdit) {
        await blogApi.update(id!, data);
      } else {
        await blogApi.create(data);
      }

      navigate("/blog");
    } catch (error) {
      console.error("Failed to save blog post:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

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
            <div>
              <h1 className="text-3xl font-display font-bold">
                {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isEdit
                  ? "Update your blog post content and settings"
                  : "Write and publish your blog post"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => navigate("/blog")}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
              className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter blog post title..."
                    {...register("title", { required: "Title is required" })}
                    className="mt-1"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of your blog post..."
                    rows={3}
                    {...register("excerpt")}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your blog post content here..."
                    rows={20}
                    {...register("content", {
                      required: "Content is required",
                    })}
                    className="mt-1"
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.content.message}
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground mt-2">
                    {watchedContent?.length || 0} characters
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            /* Publish Settings */
            <Card>
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("status", value as "draft" | "published")
                    }
                    defaultValue="draft"
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    onValueChange={(value) => setValue("category", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="content-marketing">
                        Content Marketing
                      </SelectItem>
                      <SelectItem value="seo">SEO</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="tutorials">Tutorials</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="publishedAt">Publish Date</Label>
                  <Input
                    id="publishedAt"
                    type="datetime-local"
                    {...register("publishedAt")}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input
                    id="featuredImage"
                    placeholder="https://example.com/image.jpg"
                    {...register("featuredImage")}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
            {/* SEO Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    placeholder="blog-post-url-slug"
                    {...register("slug")}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave empty to auto-generate from title
                  </p>
                </div>

                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    placeholder="Title for search engines (60 chars)"
                    {...register("seoTitle")}
                    className="mt-1"
                    maxLength={60}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {watch("seoTitle")?.length || 0}/60 characters
                  </div>
                </div>

                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    placeholder="Description for search engines (160 chars)"
                    rows={3}
                    {...register("seoDescription")}
                    className="mt-1"
                    maxLength={160}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {watch("seoDescription")?.length || 0}/160 characters
                  </div>
                </div>

                <div>
                  <Label htmlFor="readingTime">Reading Time (minutes)</Label>
                  <Input
                    id="readingTime"
                    type="number"
                    placeholder="5"
                    {...register("readingTime", { valueAsNumber: true })}
                    className="mt-1"
                    min="1"
                    max="60"
                  />
                </div>
              </CardContent>
            </Card>
            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTag}
                    disabled={!tagInput.trim()}
                  >
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <div className="font-medium line-clamp-2">
                    {watchedTitle || "Untitled Post"}
                  </div>
                  <div className="text-muted-foreground mt-2 line-clamp-3">
                    {watchedContent?.substring(0, 150) || "No content yet..."}
                    {watchedContent && watchedContent.length > 150 && "..."}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Full Preview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BlogEditor;
