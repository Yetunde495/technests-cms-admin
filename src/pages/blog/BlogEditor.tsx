import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Tag, X, CircleCheckBig } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MDEditor from "@uiw/react-md-editor";

import {
  AddPost,
  fetchBlogCategories,
  fetchPostDetails,
} from "@/services/blogServices";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateBlogpost } from "@/services/mutations/blog";
import { useUser } from "@/context/AppContext";
import { Checkbox } from "@/components/ui/checkbox";

interface BlogFormData {
  title: string;
  content: string;
  summary: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  tags: string[];
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  isFeatured: boolean;
  publishedAt?: string;
  readingTime: string;
  category: string;
}

// Map of form field names to post property names
const fieldMap = [
  ["title", "title"],
  ["content", "content"],
  ["summary", "summary"],
  ["status", "status"],
  ["category", "category"],
  ["tags", "tags"],
  ["featuredImage", "featuredImage"],
  ["isFeatured", "isFeatured"],
  ["metaTitle", "metaTitle"],
  ["metaDescription", "metaDescription"],
  ["metaKeywords", "metaKeywords"],
];
const BlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const isEdit = Boolean(id);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(isEdit);
  const [categories, setCategories] = useState<
    { _id: string; name: string; slug: string }[]
  >([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [metatagInput, setMetatagInput] = useState("");
  const [metaTags, setMetaTags] = useState<string[]>([]);
  const [content, setContent] = useState<any>("");
  const [publish, setPublish] = useState(false);

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
      summary: "",
      status: "DRAFT",
      tags: [],
      metaTitle: "",
      metaDescription: "",
      category: "",
      readingTime: "1",
      isFeatured: false,
      metaKeywords: [],
      featuredImage: "",
    },
  });

  const watchedContent = watch("content");

  const fetchPost = async () => {
    try {
      const response = await fetchPostDetails(id!);
      const post = response?.entity;
      fieldMap.forEach(([formKey, postKey]) => {
        if (post[postKey] !== undefined) {
          setValue(formKey as any, post[postKey]);
        }
      });
      setValue("category", post.category._id);
      setContent(post.content);
      setTags(post.tags || []);
      setMetaTags(post.metaKeywords || []);
      setPublish(post?.status === "PUBLISHED");
      const readingTimeStr = post.readingTime;
      const readingTimeNum =
        typeof readingTimeStr === "string"
          ? readingTimeStr.match(/\\d+/)?.[0] || "1"
          : readingTimeStr || "1";
      setValue("readingTime", readingTimeNum);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch blog post:");
      navigate("/blog");
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await fetchBlogCategories();
      // setCategories(response.data);
      setCategories(response?.entity);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // add post tags
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue("tags", newTags);
      setTagInput("");
    }
  };

  // remove post tags
  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue("tags", newTags);
  };

  // add meta keywords
  const addMetaTag = () => {
    if (metatagInput.trim() && !metaTags.includes(metatagInput.trim())) {
      const newTags = [...metaTags, metatagInput.trim()];
      setMetaTags(newTags);
      setValue("metaKeywords", newTags);
      setMetatagInput("");
    }
  };

  // remove meta keywords
  const removeMetaTag = (tagToRemove: string) => {
    const newTags = metaTags.filter((tag) => tag !== tagToRemove);
    setMetaTags(newTags);
    setValue("metaKeywords", newTags);
  };

  const AddNewPost = useMutation((data: any) => AddPost(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["ALL POSTS"]);
      toast.success("Post was created Successfully!");
      navigate(`/blog`);
    },
    onError: (err: any) => {
      // Handle error
      toast.error(
        err.message ||
          "An error occurred! This may be an issue with our service, or your network. Please, try again",
      );
    },
    onSettled: () => {
      setIsSaving(false);
    },
  });

  const {
    mutate,
    isSuccess,
    isLoading: updateLoading,
    reset,
  } = useUpdateBlogpost();

  const onSubmit = (data: BlogFormData) => {
    data.tags = tags;

    if (!data?.content) {
      toast.warning("post content is required");
      return;
    } else if (!data?.category) {
      toast.warning("post category is required");
      return;
    }

    if (isEdit) {
      mutate({
        id: id,
        payload: {
          ...data,
        },
      });
    } else {
      setIsSaving(true);
      AddNewPost.mutate({
        ...data,
        status: publish ? "PUBLISHED" : "DRAFT",
        isFeatured: true,
        author: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          _id: user?._id,
        },
      });
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };
  const handleMetaKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && metatagInput.trim()) {
      e.preventDefault();
      addMetaTag();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate("/blog");
      // setShow();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isEdit && id) {
      fetchPost();
    }
    loadCategories();
  }, [isEdit, id]);

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
        <div className="flex items-center max-sm:flex-col justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/blog")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog Manager
          </Button>
          <div>
            <h1 className="md:text-2xl text-lg font-display font-bold">
              {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
          </div>
        </div>

        <div className="w-full gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Provide the basic and essential information for the post
                </CardDescription>
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
                  <Label htmlFor="excerpt">Summary</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary of your blog post..."
                    rows={3}
                    {...register("summary", {
                      required: "This field is required",
                    })}
                    className="mt-1"
                  />
                  {errors.summary && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.summary.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input
                    id="featuredImage"
                    placeholder="https://example.com/image.jpg"
                    {...register("featuredImage", {
                      required: "This field is required",
                    })}
                    className="mt-1"
                  />
                  {errors.featuredImage && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.featuredImage.message}
                    </p>
                  )}
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(value) => {
                        setValue("category", value);
                      }}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue
                          placeholder={
                            categoriesLoading
                              ? "Loading categories..."
                              : isEdit &&
                                  !categoriesLoading &&
                                  categories.length > 0
                                ? (() => {
                                    const selectedCat = categories.find(
                                      (cat) => cat._id === watch("category"),
                                    );
                                    return (
                                      selectedCat?.name || "Select category"
                                    );
                                  })()
                                : "Select category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesLoading ? (
                          <SelectItem value="n" disabled>
                            Loading categories...
                          </SelectItem>
                        ) : categories.length === 0 ? (
                          <SelectItem value="n" disabled>
                            No categories available
                          </SelectItem>
                        ) : (
                          categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded bg-brand-600" />
                                <span>{category.name}</span>
                              </div>
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="readingTime">Reading Time (minutes)</Label>
                    <Input
                      id="readingTime"
                      type="number"
                      placeholder="1"
                      {...register("readingTime", {
                        required: "This field is required",
                      })}
                      className="mt-1"
                      min="1"
                      max="60"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <div className="wmde-var bg-white mt-2">
                    <MDEditor
                      value={content}
                      onChange={(val) => {
                        setContent(val);
                        setValue("content", val);
                      }}
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                      preview="edit"
                      textareaProps={{
                        placeholder: "Please enter content",
                      }}
                      height={400}
                    />
                  </div>
                  {errors.content && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.content.message}
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground mt-2">
                    {watchedContent?.length || 0} characters
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex flex-wrap gap-2 my-2">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
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
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Post Metadata */}
          <div className="space-y-6 my-8">
            <Card>
              <CardHeader>
                <CardTitle>SEO Metadata</CardTitle>
                <CardDescription>
                  Optimize your post for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    placeholder="Title for search engines (60 chars)"
                    {...register("metaTitle")}
                    className="mt-1"
                    maxLength={60}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {watch("metaTitle")?.length || 0}/60 characters
                  </div>
                </div>

                <div>
                  <Label htmlFor="meta_description">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    placeholder="Description for search engines (160 chars)"
                    rows={3}
                    {...register("metaDescription")}
                    className="mt-1"
                    maxLength={160}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {watch("metaDescription")?.length || 0}/160 characters
                  </div>
                </div>

                <div>
                  <Label htmlFor="metaKeywords">Meta Keywords</Label>
                  <div className="flex flex-wrap gap-2 my-2">
                    {metaTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeMetaTag(tag)}
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
                      value={metatagInput}
                      onChange={(e) => setMetatagInput(e.target.value)}
                      onKeyPress={handleMetaKeyPress}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addMetaTag}
                      disabled={!metatagInput.trim()}
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Post Visibility */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Post Visibility</CardTitle>
                <CardDescription>
                  Control how and where your post appears
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="">
                  <label className="flex items-start space-x-2">
                    <Checkbox className="mt-1 " {...register("isFeatured")} />
                    <div>
                      <span className="font-medium text-[15px] text-zinc-700">
                        Feature this post
                      </span>
                      <p className="text-sm text-zinc-500">
                        Mark this post as featured to display it prominently on
                        the homepage or top sections.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="">
                  <label className="flex items-start space-x-2">
                    <Checkbox
                      className="mt-1 "
                      // onChange={(val) => {setPublish(val)}}
                      onCheckedChange={() => setPublish(!publish)}
                      checked={publish}
                    />
                    <div>
                      <span className="font-medium text-[15px] text-zinc-700">
                        Publish this post
                      </span>
                      <p className="text-sm text-zinc-500">
                        Make this post publicly visible. Unpublished posts will
                        remain as drafts.
                      </p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2 py-8">
          <div className="">
            <Button variant="outline" onClick={() => navigate("/blog")}>
              Cancel
            </Button>
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving || updateLoading}
            className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700"
          >
            <CircleCheckBig className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : isEdit ? "Update Post" : "Save Post"}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default BlogEditor;
